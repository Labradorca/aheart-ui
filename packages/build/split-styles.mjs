import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import postcss from 'postcss'
import { getComponentEntries } from './package-entries.mjs'
import { fullStyleSources } from '../components/build/entries.mjs'

const packageDirectories = { base: 'components', ai: 'ai', dnd: 'dnd' }
const sourceFile = (domain, file) => new URL(`../${packageDirectories[domain]}/src/${file}`, import.meta.url)

/** Resolve only explicitly declared public dependencies, including aliases. */
export function entryClosure(domain, subpath, visiting = new Set(), found = new Map()) {
  const key = `${domain}/${subpath}`
  if (visiting.has(key)) throw new Error(`Cyclic component dependency: ${key}`)
  if (found.has(key)) return [...found.values()]
  const entries = getComponentEntries(domain)
  const entry = entries?.find(candidate => candidate.subpath === subpath)
  if (!entry) throw new Error(`Unknown component dependency: ${key}`)
  visiting.add(key)
  if (!entry.sourceEntry) {
    const canonical = entries.find(candidate => candidate.sourceEntry && `${candidate.subpath}/index` === entry.output)
    if (!canonical) throw new Error(`Unknown canonical entry: ${key}`)
    entryClosure(domain, canonical.subpath, visiting, found)
  }
  for (const dependency of entry.dependencies ?? []) {
    const [targetDomain, targetPath] = dependency.includes('/') ? dependency.split('/') : [domain, dependency]
    entryClosure(targetDomain, targetPath, visiting, found)
  }
  visiting.delete(key)
  found.set(key, { domain, entry })
  return [...found.values()]
}

/** Stable source identities deduplicate shared base styles before emitting CSS. */
export function componentStyleParts(domain, subpath) {
  const closure = entryClosure(domain, subpath)
  const kebab = name => name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
  const baseScopes = [...new Set(closure.filter(item => item.domain === 'base').flatMap(({ entry }) => [entry.subpath, ...(entry.names ?? []).map(kebab)]))]
  if (closure.some(item => item.domain === 'base' && item.entry.styles.includes('utils/floating.css'))) baseScopes.push('floating')
  const dndScopes = [...new Set(closure.filter(item => item.domain === 'dnd').flatMap(({ entry }) => entry.scopes ?? []))]
  const baseStyles = new Set(closure.filter(item => item.domain === 'base').flatMap(({ entry }) => entry.styles))
  for (const file of baseStyles) if (!fullStyleSources.includes(file)) throw new Error(`Unknown base stylesheet: ${file}`)
  const parts = fullStyleSources.filter(file => baseStyles.has(file)).map(file => ({
    id: `base/${file}`, css: readFileSync(sourceFile('base', file), 'utf8').trimEnd()
  }))
  for (const target of ['dnd', 'ai']) {
    const scopes = [...new Set(closure.filter(item => item.domain === target).flatMap(({ entry }) => entry.scopes ?? []))]
    if (scopes.length) parts.push({
      id: `${target}/scopes:${[...scopes].sort().join(',')}`,
      css: selectComponentStyles(readFileSync(sourceFile(target, 'style.css'), 'utf8'), `aheart-${target}-`, scopes, target === 'ai' ? { 'aheart-': baseScopes, 'aheart-dnd-': dndScopes } : {}).trimEnd()
    })
  }
  return parts
}

export const componentStyleClosure = (domain, subpath) => `${componentStyleParts(domain, subpath).map(part => part.css).join('\n')}\n`

export function selectComponentStyles(css, prefix, scopes, contexts = {}) {
  const root = postcss.parse(css)
  const groups = { [prefix]: scopes, ...contexts }
  const prefixes = Object.keys(groups).sort((a, b) => b.length - a.length)
  const isIncluded = (className, allowed) => allowed.some((scope) =>
    className === scope || className.startsWith(`${scope}__`) || className.startsWith(`${scope}--`)
  )
  root.walkRules((rule) => {
    const included = rule.selectors.filter(selector => {
      if (selector === ':root') return true
      const classes = Array.from(selector.matchAll(/\.([\w-]+)/g), ([, value]) => value)
      if (!classes.some(value => value.startsWith(prefix)) || classes.some(value => value.startsWith('d8-fixture'))) return false
      if (!prefixes.some(value => classes[0]?.startsWith(value))) return false
      return classes.filter(value => value.startsWith('aheart-')).every(value => {
        const owner = prefixes.find(candidate => value.startsWith(candidate))
        return owner && isIncluded(value.slice(owner.length), groups[owner])
      })
    })
    if (included.length === 0) rule.remove()
    else if (included.length !== rule.selectors.length) rule.selectors = included
  })
  root.walkAtRules((rule) => {
    if (rule.nodes?.length === 0) rule.remove()
  })
  return `${root.toString().trim()}\n`
}

export function splitPackageStyles(directory, domain, entries) {
  return {
    name: `aheart-${domain}-split-styles`,
    closeBundle() {
      const css = `${readFileSync(new URL('src/style.css', directory), 'utf8').trimEnd()}\n`
      const parts = entries.filter(({ scopes }) => scopes).map(({ subpath }) =>
        [`${subpath}/style.css`, componentStyleClosure(domain, subpath)]
      )

      for (const [folder, type] of [['es', 'module'], ['lib', 'commonjs']]) {
        const emit = (file, contents) => {
          const target = new URL(`${folder}/${file}`, directory)
          mkdirSync(new URL('.', target), { recursive: true })
          writeFileSync(target, contents)
        }
        emit('style.css', css)
        emit('package.json', `{\n  "type": "${type}"\n}\n`)
        for (const [file, contents] of parts) emit(file, contents)
      }
    }
  }
}
