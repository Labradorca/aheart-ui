import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { auditPublicCss, frozenCompositeReviewErrors } from './v1-css-integrity.mjs'

const mixed = '.aheart-dnd-sortable-item:last-child .aheart-ai-workbench__timeline-item::before { display: none; }'
const manifest = { base: [], dnd: [{ subpath: 'sortable', sourceEntry: 'sortable/index.ts', scopes: ['sortable-item'] }], ai: [{ subpath: 'workbench', sourceEntry: 'workbench/index.ts', scopes: ['workbench'], budgetClass: 'composite', dependencies: ['dnd/sortable'] }] }
const source = `${mixed}\n.d8-fixture-card .aheart-ai-workbench { border: 0; }\n.aheart-table .aheart-ai-workbench { color: red; }`
const audit = css => auditPublicCss({ manifest, domain: 'ai', subpath: 'workbench', css, readSource: domain => domain === 'ai' ? source : '.aheart-dnd-sortable-item { display: block; }' })
const complete = `.aheart-dnd-sortable-item { display: block; }\n${mixed}`
test('independent audit finds cross-namespace selectors away from the first class', () => {
  assert.equal(audit(complete).pass, true)
  const dropped = audit('.aheart-dnd-sortable-item { display: block; }')
  assert.equal(dropped.pass, false)
  assert.equal(dropped.missing[0][1], '.aheart-dnd-sortable-item:last-child .aheart-ai-workbench__timeline-item::before')
  assert.equal(audit(complete).excludedFixtures.length, 1)
})
test('independent audit rejects changed values, contexts, order, duplicates and undeclared rules', () => {
  for (const css of [complete.replace('none', 'block'), `@media(max-width:5px){${complete}}`, `${mixed}\n.aheart-dnd-sortable-item { display: block; }`, `${complete}\n${mixed}`, `${complete}\n.aheart-table { color: red; }`]) assert.equal(audit(css).pass, false)
})
test('all composite freezes require a matching successful independent review', () => {
  const data = { entries: { 'ai/workbench': { bytes: Buffer.byteLength(complete), sha256: audit(complete).cssSha256 } } }
  assert.ok(frozenCompositeReviewErrors(manifest, data).length)
  data.integrityReview = { schema: 'aheart-css-integrity.v1', entries: { 'ai/workbench': audit(complete) } }
  assert.deepEqual(frozenCompositeReviewErrors(manifest, data), [])
  data.entries['ai/workbench'].bytes++
  assert.ok(frozenCompositeReviewErrors(manifest, data).length)
})
test('recorded current composite baselines were independently reviewed before freezing', () => {
  const root = new URL('..', import.meta.url)
  const actual = JSON.parse(readFileSync(new URL('packages/components/src/constant/entries.json', root), 'utf8'))
  const baseline = JSON.parse(readFileSync(new URL('evidence/V1/css-baselines.json', root), 'utf8'))
  assert.deepEqual(frozenCompositeReviewErrors(actual, baseline), [])
})
