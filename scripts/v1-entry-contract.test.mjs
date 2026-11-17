import assert from 'node:assert/strict'
import test from 'node:test'
import { cssAtoms, cssUnionErrors, moduleBoundaryErrors, cssBudgetErrors, jsBudgetErrors } from './v1-entry-contract.mjs'
import { componentStyleClosure, entryClosure, selectComponentStyles } from '../packages/build/split-styles.mjs'
import { readFileSync } from 'node:fs'

test('CSS union rejects extra/missing selectors, changed declarations, context and order', () => {
  const css = '.a{color:red!important}@media(max-width:10px){.b{display:none}}'
  assert.deepEqual(cssUnionErrors(css, css), [])
  for (const invalid of [css + '.table{color:red}', '.a{color:red!important}', css.replace('red', 'blue'), css.replace('10px', '20px'), '@media(max-width:10px){.b{display:none}}.a{color:red!important}', css + '.a{color:red!important}']) assert.ok(cssUnionErrors(invalid, css).length)
  assert.throws(() => cssAtoms('@import "full.css";'), /Unresolved/)
})

test('AIForm closure includes exact declared field styles and no Table or Workbench', () => {
  const css = componentStyleClosure('ai', 'form')
  for (const name of ['button', 'checkbox', 'date-picker', 'form', 'input', 'input-number', 'radio', 'select', 'switch', 'textarea', 'time-picker', 'tree-select', 'upload', 'ai-form']) assert.match(css, new RegExp(`\\.aheart-${name}(?:[\\s:_.{>-]|$)`))
  assert.doesNotMatch(css, /\.aheart-(table|ai-workbench|ai-visually-hidden|dnd-)/)
})
test('cross-family selectors retain declared DND context and exclude fixtures or undeclared families', () => {
  const css='.aheart-dnd-sortable-item:last-child .aheart-ai-workbench__timeline-item::before { display: none; }\n.d8-fixture-card .aheart-ai-workbench { border: 0; }\n.aheart-table .aheart-ai-workbench { color: red; }'
  const selected=selectComponentStyles(css,'aheart-ai-',['workbench'],{'aheart-dnd-':['sortable-item']})
  assert.match(selected,/aheart-dnd-sortable-item:last-child \.aheart-ai-workbench__timeline-item::before/)
  assert.doesNotMatch(selected,/d8-fixture|aheart-table/)
  assert.doesNotMatch(selectComponentStyles(css,'aheart-ai-',['workbench']),/aheart-dnd-/)
})

test('module boundary rejects root barrels, undeclared base and optional packages', () => {
  const closure = entryClosure('ai', 'form')
  const permitted = ['/node_modules/aheart-ui/es/input/index.js', '/node_modules/aheart-ui/es/form/control-context.js', '/node_modules/@aheart-ui/ai/es/form-field.vue.js']
  assert.deepEqual(moduleBoundaryErrors(permitted, closure), [])
  for (const id of ['/node_modules/aheart-ui/es/index.js', '/node_modules/aheart-ui/es/plugin.js', '/node_modules/aheart-ui/es/table/table.vue.js', '/node_modules/@aheart-ui/ai/es/agent-workbench.vue.js', '/node_modules/@aheart-ui/dnd/es/sortable/index.js']) assert.deepEqual(moduleBoundaryErrors([id], closure), [id])
  assert.deepEqual(moduleBoundaryErrors(['/node_modules/aheart-ui/es/utils/install.js'], entryClosure('base', 'button')), [])
  for (const id of ['/node_modules/aheart-ui/es/picker-core/calendar.js', '/node_modules/aheart-ui/es/utils/undeclared-helper.js']) assert.deepEqual(moduleBoundaryErrors([id], entryClosure('base', 'button')), [id])
})

test('leaf and already-passing composites keep exact M1 hard boundaries', () => {
  for (const budgetClass of ['leaf', 'composite']) {
    const base = { entry: { budgetClass, cssGate: 'leaf' }, fullBytes: 10000, themeBytes: 500, bytes: 2500 }
    assert.deepEqual(cssBudgetErrors(base).errors, [])
    assert.ok(cssBudgetErrors({ ...base, bytes: 2501 }).errors.includes('component exceeds 25%'))
    assert.ok(cssBudgetErrors({ ...base, themeBytes: 501 }).errors.includes('theme exceeds 5%'))
  }
  assert.ok(cssBudgetErrors({ entry: { budgetClass: 'leaf', cssGate: 'union-ratchet' }, bytes: 3000, themeBytes: 50, fullBytes: 10000 }).errors.includes('leaf entry cannot use a composite exception'))
})

test('composite exception requires initial exceedance and freezes dependency bytes/share', () => {
  const args = { entry: { budgetClass: 'composite', cssGate: 'union-ratchet' }, bytes: 4000, fullBytes: 10000, themeBytes: 100, dependencies: [{ entry: 'base/input', bytes: 1000, fraction: .25 }], baseline: { firstLeafPass: false, bytes: 4000, dependencies: [{ entry: 'base/input', bytes: 1000, fraction: .25 }] } }
  assert.deepEqual(cssBudgetErrors(args).errors, [])
  assert.ok(cssBudgetErrors({ ...args, bytes: 4001 }).errors.length)
  assert.ok(cssBudgetErrors({ ...args, baseline: { ...args.baseline, firstLeafPass: true } }).errors.length)
  assert.ok(cssBudgetErrors({ ...args, baseline: { ...args.baseline, bytes: undefined } }).errors.includes('composite closure baseline bytes are missing'))
  assert.ok(cssBudgetErrors({ ...args, dependencies: [{ entry: 'base/input', bytes: 1000, fraction: .26 }] }).errors.length)
  assert.ok(cssBudgetErrors({ ...args, dependencies: [...args.dependencies, { entry: 'base/table', bytes: 1, fraction: .00025 }] }).errors.length)
})

test('JS retains strict full and root-named increment boundaries', () => {
  assert.deepEqual(jsBudgetErrors(1512, 1000, 2000), [])
  assert.ok(jsBudgetErrors(1513, 1000, 2000).length)
  assert.ok(jsBudgetErrors(2000, 2000, 2000).length)
  assert.deepEqual(jsBudgetErrors(101000, 100000, 200000), [])
  assert.ok(jsBudgetErrors(101001, 100000, 200000).length)
})

test('real recorded composite baselines reject even one byte of closure growth', () => {
  const recorded = JSON.parse(readFileSync(new URL('../evidence/V1/css-baselines.json', import.meta.url), 'utf8'))
  for (const baseline of Object.values(recorded.entries).filter(entry => entry.gate === 'union-ratchet')) {
    const args = { entry: { budgetClass: 'composite', cssGate: 'union-ratchet' }, bytes: baseline.bytes + 1, fullBytes: recorded.denominator.fullBytes, themeBytes: recorded.denominator.themeBytes, dependencies: baseline.dependencies, baseline }
    assert.ok(cssBudgetErrors(args).errors.includes('composite closure exceeds non-increase baseline'))
  }
})
