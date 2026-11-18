import postcss from 'postcss'

// Ordered rules preserve context, declarations, !important and cascade order.
export function cssAtoms(css) {
  const atoms = []
  const ancestry = node => {
    const parents = []
    for (let parent = node.parent; parent?.type !== 'root'; parent = parent.parent) {
      if (parent.type === 'atrule') parents.unshift([parent.name, parent.params.trim()])
    }
    return parents
  }
  const root = postcss.parse(css)
  root.walkRules(rule => {
    const declarations = rule.nodes.filter(node => node.type === 'decl').map(node => [node.prop, node.value, Boolean(node.important)])
    for (const selector of rule.selectors) atoms.push(JSON.stringify([ancestry(rule), selector.trim(), declarations]))
  })
  root.walkAtRules(rule => {
    if (rule.name === 'import') throw new Error('Unresolved CSS @import in the public closure')
    if (rule.nodes?.some(node => node.type === 'decl')) atoms.push(JSON.stringify([ancestry(rule), `@${rule.name} ${rule.params}`, rule.nodes.filter(node => node.type === 'decl').map(node => [node.prop, node.value, Boolean(node.important)])]))
  })
  return atoms
}

export function cssUnionErrors(actual, expected) {
  const a = cssAtoms(actual), e = cssAtoms(expected)
  const actualSet = new Set(a), expectedSet = new Set(e)
  const errors = []
  if (a.some(atom => !expectedSet.has(atom))) errors.push('extra CSS rules/selectors/declarations outside declared union')
  if (e.some(atom => !actualSet.has(atom))) errors.push('missing declared CSS rules/selectors/declarations')
  if (JSON.stringify(a) !== JSON.stringify(e)) errors.push('CSS rule multiplicity or cascade order differs from declared union')
  return errors
}

export function moduleBoundaryErrors(ids, closure) {
  const base = new Set(closure.filter(item => item.domain === 'base').map(({ entry }) => entry.subpath))
  const shared = new Set(closure.filter(item => item.domain === 'base').flatMap(({ entry }) => entry.sharedModules ?? []))
  const runtime = domain => new Set(closure.filter(item => item.domain === domain).flatMap(({ entry }) => entry.runtimeModules ?? []))
  const ai = runtime('ai'), dnd = runtime('dnd')
  return ids.filter(id => {
    const plain = id.split('?')[0]
    const core = /\/node_modules\/aheart-ui\/es\/(.+)$/.exec(plain)
    if (core) {
      const file = core[1], family = file.split('/')[0]
      return !base.has(family) && !shared.has(file) && file !== '_virtual/_plugin-vue_export-helper.js'
    }
    const optional = /\/node_modules\/@aheart-ui\/(ai|dnd)\/es\/(.+)$/.exec(plain)
    if (!optional) return false
    const allowed = optional[1] === 'ai' ? ai : dnd
    return !allowed.has(optional[2]) && !(allowed.size && optional[2] === '_virtual/_plugin-vue_export-helper.js')
  })
}

export function cssBudgetErrors({ entry, bytes, themeBytes, fullBytes, baseline, dependencies = [] }) {
  const errors = []
  if (themeBytes > fullBytes * 0.05) errors.push('theme exceeds 5%')
  const leafPass = bytes <= fullBytes * 0.25 && bytes + themeBytes <= fullBytes * 0.30
  if (entry.budgetClass === 'leaf' && entry.cssGate !== 'leaf') errors.push('leaf entry cannot use a composite exception')
  if (entry.cssGate === 'leaf') {
    if (bytes > fullBytes * 0.25) errors.push('component exceeds 25%')
    if (bytes + themeBytes > fullBytes * 0.30) errors.push('theme plus component exceeds 30%')
  } else if (entry.cssGate === 'union-ratchet') {
    if (entry.budgetClass !== 'composite' || !baseline || baseline.firstLeafPass !== false) errors.push('composite exception lacks measured first-pass exceedance')
    if (!Number.isFinite(baseline?.bytes)) errors.push('composite closure baseline bytes are missing')
    if (baseline && bytes > baseline.bytes) errors.push('composite closure exceeds non-increase baseline')
    const previous = new Map((baseline?.dependencies ?? []).map(dependency => [dependency.entry, dependency]))
    if (JSON.stringify([...previous.keys()].sort()) !== JSON.stringify(dependencies.map(dependency => dependency.entry).sort())) errors.push('declared dependency set differs from frozen baseline')
    for (const dependency of dependencies) {
      const old = previous.get(dependency.entry)
      if (!old || !Number.isFinite(old.bytes) || !Number.isFinite(old.fraction) || dependency.bytes > old.bytes || dependency.fraction > old.fraction + 1e-12) errors.push(`${dependency.entry}: dependency size/share increased`)
    }
  } else errors.push('CSS gate not finalized after first measurement')
  return { errors, leafPass }
}

export function jsBudgetErrors(selected, named, full) {
  const errors = []
  if (selected >= full) errors.push('subentry gzip must be smaller than full Plugin')
  if (selected > named + Math.max(512, named * 0.01)) errors.push('root named gzip increment exceeds max(512 B, 1%)')
  return errors
}
