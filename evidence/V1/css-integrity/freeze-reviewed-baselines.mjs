import assert from 'node:assert/strict'
import { readFileSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { auditPublicCss, frozenCompositeReviewErrors } from '../../../scripts/v1-css-integrity.mjs'
const read = file => readFileSync(file, 'utf8'), json = file => JSON.parse(read(file)), sha = value => createHash('sha256').update(value).digest('hex')
const manifest = json('packages/components/src/constant/entries.json')
const before = json('evidence/V1/css-closure/selector-fix/unchanged-initial-baseline.json')
const file = 'evidence/V1/css-baselines.json', baseline = json(file)
assert.deepEqual(baseline, before, 'Only execute this owner-authorized correction once, from the retained invalid initial snapshot')
const packages = { base: ['aheart-ui', '1.4.0'], ai: ['@aheart-ui/ai', '1.2.0'], dnd: ['@aheart-ui/dnd', '1.1.0'] }, reviews = {}, tarballs = []
for (const [domain, [name, version]] of Object.entries(packages)) {
  const tarball = `test-results/release-tarballs/${name.replace(/^@/, '').replaceAll('/', '-')}-${version}.tgz`
  const pkg = JSON.parse(execFileSync('tar', ['-xOf', tarball, 'package/package.json'], { encoding: 'utf8' }))
  tarballs.push({ name, version, sha256: sha(readFileSync(tarball)) })
  for (const entry of manifest[domain]) {
    const target = pkg.exports[`./${entry.subpath}/style.css`]
    assert.equal(typeof target, 'string')
    const css = execFileSync('tar', ['-xOf', tarball, `package/${target.slice(2)}`], { maxBuffer: 4*1024*1024 })
    const proof = auditPublicCss({ manifest, domain, subpath: entry.subpath, css })
    reviews[proof.entry] = proof
  }
}
const report = { schema: 'aheart-css-integrity.v1', reviewedAt: new Date().toISOString(), method: 'independent source AST traversal, any selector class position; no splitter imports', ownerDecision: '../owner-workbench-baseline-correction-2026-11-17.md', tarballs, entries: reviews, pass: Object.values(reviews).every(proof => proof.pass) }
writeFileSync('evidence/V1/css-integrity/freeze-review.json', JSON.stringify(report,null,2)+'\n')
assert.equal(report.pass, true, JSON.stringify(Object.values(reviews).filter(proof=>!proof.pass),null,2))
const corrected = ['ai/agent-workbench','ai/workbench']
for (const key of corrected) {
  const data = baseline.entries[key], proof = reviews[key]
  assert.equal(data.bytes, 54109); assert.equal(proof.bytes, 54212)
  Object.assign(data, { bytes: 54212, fractionOfFull: 54212/baseline.denominator.fullBytes, themePlusBytes: 54212+baseline.denominator.themeBytes, themePlusFraction: (54212+baseline.denominator.themeBytes)/baseline.denominator.fullBytes, sha256: proof.cssSha256 })
  for (const dependency of data.dependencies) dependency.fraction = dependency.bytes / 54212
}
for (const [key, entry] of Object.entries(baseline.entries)) if (!corrected.includes(key)) assert.deepEqual(entry,before.entries[key],`${key} changed outside owner authorization`)
baseline.status = 'initial composite baselines frozen only after independent integrity review; not full V1 acceptance'
baseline.integrityReview = { schema: report.schema, reviewedAt: report.reviewedAt, method: report.method, report: 'css-integrity/freeze-review.json', entries: Object.fromEntries(Object.entries(reviews).filter(([key])=>{const [domain,subpath]=key.split('/');return manifest[domain].find(entry=>entry.subpath===subpath).budgetClass==='composite'})) }
baseline.corrections = [{ ownerDecision: 'owner-workbench-baseline-correction-2026-11-17.md', entries: corrected, invalidInitialBytes: 54109, correctedInitialBytes: 54212, reason: 'splitter omitted a selector whose AI family class was not first', invalidHistory: 'css-closure/selector-fix/unchanged-initial-baseline.json', failureEvidence: 'css-closure/selector-fix/packed/results.json', tarballs }]
assert.deepEqual(frozenCompositeReviewErrors(manifest,baseline),[])
writeFileSync(file,JSON.stringify(baseline,null,2)+'\n')
console.log(JSON.stringify({pass:true,independentEntries:65,compositesReviewed:Object.keys(baseline.integrityReview.entries).length,corrected,unchangedOtherBaselineEntries:63},null,2))
