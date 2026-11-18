import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import postcss from 'postcss'
import { fullStyleSources } from '../packages/components/build/entries.mjs'

const directories = { base: 'components', ai: 'ai', dnd: 'dnd' }
const hash = value => createHash('sha256').update(value).digest('hex')
const defaultRead = (domain, file) => readFileSync(new URL(`../packages/${directories[domain]}/src/${file}`, import.meta.url), 'utf8')
const namespaced = (domain, scope) => `${domain === 'base' ? 'aheart-' : `aheart-${domain}-`}${scope}`
const familyMatch = (name, family) => name === family || name.startsWith(`${family}__`) || name.startsWith(`${family}--`)

// This module does not import the stylesheet splitter or its closure/filter helpers.
// Traverse the public declaration graph independently, including scene aliases.
export function visualDeclarations(manifest, domain, subpath, found = new Map(), active = new Set()) {
  const key = `${domain}/${subpath}`
  if (active.has(key)) throw new Error(`Visual dependency cycle: ${key}`)
  if (found.has(key)) return [...found.values()]
  const entry = manifest[domain]?.find(item => item.subpath === subpath)
  if (!entry) throw new Error(`Unknown visual dependency: ${key}`)
  active.add(key)
  if (!entry.sourceEntry) {
    const canonical = manifest[domain].find(item => item.sourceEntry && `${item.subpath}/index` === entry.output)
    if (!canonical) throw new Error(`Unknown visual alias: ${key}`)
    visualDeclarations(manifest, domain, canonical.subpath, found, active)
  }
  for (const dependency of entry.dependencies ?? []) {
    const [target, path] = dependency.includes('/') ? dependency.split('/') : [domain, dependency]
    visualDeclarations(manifest, target, path, found, active)
  }
  active.delete(key)
  found.set(key, { domain, entry })
  return [...found.values()]
}

// Read selectors in ANY class position, together with declaration values, order,
// !important and enclosing at-rules. No extraction or first-class filter is reused.
function sourceAtoms(css, select = () => true) {
  const atoms = [], fixtures = []
  const parents = node => {
    const context = []
    for (let parent = node.parent; parent && parent.type !== 'root'; parent = parent.parent) {
      if (parent.type === 'atrule') context.unshift([parent.name, parent.params.trim()])
    }
    return context
  }
  const declarations = node => (node.nodes ?? []).filter(child => child.type === 'decl').map(child => [child.prop, child.value, !!child.important])
  const root = postcss.parse(css)
  root.walkRules(rule => {
    for (const selector of rule.selectors) {
      if (select(selector, fixtures)) atoms.push(JSON.stringify([parents(rule), selector.trim(), declarations(rule)]))
    }
  })
  root.walkAtRules(rule => {
    if (rule.name === 'import') throw new Error('Independent audit requires resolved styles, not @import')
    if (rule.nodes?.some(node => node.type === 'decl')) atoms.push(JSON.stringify([parents(rule), `@${rule.name} ${rule.params}`, declarations(rule)]))
  })
  return { atoms, fixtures }
}

export function auditPublicCss({ manifest, domain, subpath, css, readSource = defaultRead }) {
  const closure = visualDeclarations(manifest, domain, subpath)
  const baseFiles = new Set(closure.filter(item => item.domain === 'base').flatMap(item => item.entry.styles))
  for (const file of baseFiles) if (!fullStyleSources.includes(file)) throw new Error(`Unordered source stylesheet: ${file}`)
  const families = new Set()
  for (const { domain: target, entry } of closure) {
    const scopes = target === 'base' ? [entry.subpath, ...(entry.names ?? []).map(name => name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase())] : entry.scopes ?? []
    for (const scope of scopes) families.add(namespaced(target, scope))
  }
  if (baseFiles.has('utils/floating.css')) families.add('aheart-floating')
  const expected = [], sources = [], excludedFixtures = []
  const consume = (target, file, select) => {
    const text = readSource(target, file), parsed = sourceAtoms(text, select)
    sources.push({ source: `${target}/${file}`, sha256: hash(text) })
    expected.push(...parsed.atoms)
    excludedFixtures.push(...parsed.fixtures)
  }
  for (const file of fullStyleSources.filter(file => baseFiles.has(file))) consume('base', file)
  for (const target of ['dnd', 'ai']) {
    const scopes = [...new Set(closure.filter(item => item.domain === target).flatMap(item => item.entry.scopes ?? []))]
    if (!scopes.length) continue
    const own = scopes.map(scope => namespaced(target, scope))
    consume(target, 'style.css', (selector, fixtures) => {
      if (selector.trim() === ':root') return true
      const classes = [...selector.matchAll(/\.([\w-]+)/g)].map(match => match[1])
      if (!classes.some(name => own.some(family => familyMatch(name, family)))) return false
      if (classes.some(name => name.startsWith('d8-fixture'))) { fixtures.push(selector); return false }
      return classes.filter(name => name.startsWith('aheart-')).every(name => [...families].some(family => familyMatch(name, family)))
    })
  }
  const text = Buffer.isBuffer(css) ? css.toString() : css
  const actual = sourceAtoms(text).atoms
  const counts = atoms => atoms.reduce((map, atom) => map.set(atom, (map.get(atom) ?? 0) + 1), new Map())
  const actualCounts = counts(actual), expectedCounts = counts(expected)
  const missing = [...expectedCounts].filter(([atom, count]) => (actualCounts.get(atom) ?? 0) < count).map(([atom]) => JSON.parse(atom))
  const extra = [...actualCounts].filter(([atom, count]) => (expectedCounts.get(atom) ?? 0) < count).map(([atom]) => JSON.parse(atom))
  const orderPass = JSON.stringify(expected) === JSON.stringify(actual)
  return { schema: 'aheart-css-integrity.v1', entry: `${domain}/${subpath}`, independent: true, pass: orderPass && !missing.length && !extra.length, bytes: Buffer.byteLength(text), cssSha256: hash(text), sourceSha256: hash(JSON.stringify({ sources, closure: closure.map(item => ({ domain: item.domain, entry: item.entry })) })), expectedAtomsSha256: hash(JSON.stringify(expected)), expectedAtoms: expected.length, actualAtoms: actual.length, orderPass, missing, extra, excludedFixtures, sources }
}

export function frozenCompositeReviewErrors(manifest, baseline) {
  const errors = [], review = baseline.integrityReview
  if (review?.schema !== 'aheart-css-integrity.v1') errors.push('composite baselines lack an independent integrity review')
  for (const domain of Object.keys(directories)) for (const entry of manifest[domain] ?? []) {
    if (entry.budgetClass !== 'composite') continue
    const key = `${domain}/${entry.subpath}`, proof = review?.entries?.[key], frozen = baseline.entries[key]
    if (!proof?.independent || proof.pass !== true || !proof.expectedAtomsSha256 || !proof.sourceSha256 || proof.cssSha256 !== frozen?.sha256 || proof.bytes !== frozen?.bytes) errors.push(`${key}: initial baseline was not independently verified before freezing`)
  }
  return errors
}
