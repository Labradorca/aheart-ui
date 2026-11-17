// Verify this peer-stop snapshot without resuming V1 implementation.
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import path from 'node:path'

const json = file => JSON.parse(readFileSync(file, 'utf8'))
const sha = value => createHash('sha256').update(value).digest('hex')
const git = args => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }).trim()
const directory = 'evidence/V1/aiform-precise-imports'
const result = json(`${directory}/results.json`)
assert.equal(result.status, 'passed')
assert.equal(result.graph.baseRootBarrelParsed, false)
assert.deepEqual(result.graph.unrelatedBaseModules, [])
assert.ok(result.commands.every(command => command.exitCode === 0))
const graph = json(`${directory}/scoped-module-graph.json`)
const aiModules = graph.parsed.filter(id => id.includes('/node_modules/@aheart-ui/ai/es/')).map(id => id.split('/node_modules/@aheart-ui/ai/es/')[1]).sort()
assert.deepEqual(aiModules, ['form-field.vue.js', 'form-schema.js', 'form.vue.js', 'form/index.js'])
assert.equal(graph.parsed.filter(id => id.includes('/node_modules/@aheart-ui/dnd/')).length, 0)
const manifest = json('packages/components/src/constant/entries.json')
const approved = json('evidence/V1/classification/approved.json')
const key = entry => `${entry.domain}/${entry.subpath}`
assert.deepEqual(approved.entries.map(key).sort(), ['base', 'ai', 'dnd'].flatMap(domain => manifest[domain].map(entry => key({ domain, ...entry }))).sort())
assert.equal(approved.entries.filter(entry => entry.classification === 'composite').length, 12)
assert.equal(approved.entries.filter(entry => entry.classification === 'leaf').length, 53)
assert.ok(approved.entries.every(entry => entry.status === 'owner_confirmed'))
const firstPass = json(`${directory}/composite-css-first-pass.json`)
assert.equal(firstPass.compositeEntries.length, 12)
assert.equal(firstPass.leafHardLocked, 8)
assert.equal(firstPass.pendingCompleteFirstPass, 4)
assert.equal(firstPass.compositeEntries.find(entry => entry.entry === 'aheart-ui/modal').modalM1Protection, true)
assert.ok(firstPass.compositeEntries.find(entry => entry.entry === 'aheart-ui/modal').finalGate.startsWith('leaf-hard'))

const baseline = json('evidence/V1/baseline.json')
const protectedPaths = Object.keys(baseline.protectedSourceSha256)
assert.equal(git(['diff', 'e0c6f80', '--name-only', '--', ...protectedPaths]), '')
const changedFromInitial = protectedPaths.filter(file => sha(readFileSync(file)) !== baseline.protectedSourceSha256[file]).sort()
assert.deepEqual(changedFromInitial, ['scripts/fixtures/m3-consumer/probe.mjs', 'scripts/m1-consumer.mjs'])
assert.equal(git(['diff', 'e0c6f80', '--name-only', '--', 'pnpm-lock.yaml', 'packages/components/package.json', 'packages/ai/package.json', 'packages/dnd/package.json', 'evidence/M1/contract.md', 'docs/superpowers/specs']), '')
const versions = Object.fromEntries(['components', 'ai', 'dnd'].map(name => [name, json(`packages/${name}/package.json`).version]))
assert.deepEqual(versions, { components: '1.3.0', ai: '1.1.0', dnd: '1.1.0' })
assert.equal(json('packages/ai/package.json').peerDependencies['aheart-ui'], 'workspace:^1.1.0')
const documents = ['docs/superpowers/plans/2026-11-17-aiform-on-demand-feasibility.md', 'evidence/V1/decision-log.md', 'evidence/V1/diff-summary.md', 'evidence/V1/owner-classification-confirmation-2026-11-17.md', 'evidence/V1/owner-a2-3-clarification-2026-11-17.md', 'evidence/V1/classification/README.md', 'evidence/V1/aiform-budget/README.md', 'evidence/V1/aiform-design/README.md', 'evidence/V1/composite-css-gates.md', `${directory}/README.md`, `${directory}/peer-impact.md`]
let links = 0
for (const file of documents) for (const [, target] of readFileSync(file, 'utf8').matchAll(/\]\(([^)]+)\)/g)) {
  if (/^(?:https?:|#)/.test(target)) continue
  assert.ok(existsSync(path.resolve(path.dirname(file), decodeURIComponent(target.split('#')[0]))), `${file}: ${target}`)
  links++
}
const outputs = ['probe.mjs', 'results.json', 'scoped-module-graph.json', 'root-named-module-graph.json', 'full-module-graph.json', 'composite-css-first-pass.json']
const receipt = { checkedAt: new Date().toISOString(), head: git(['rev-parse', 'HEAD']), status: 'peer-stop verification passed; V1 still incomplete; peer modification requires owner decision', command: ['node', `${directory}/verify-stop.mjs`], protectedSourceCount: protectedPaths.length, protectedChangesSinceE0: [], changedFromInitial, businessPilotChanges: [], versions, sourcePeer: 'workspace:^1.1.0', approvedClassification: { composite: 12, leaf: 53 }, cssFirstPass: { leafHardLocked: 8, pending: 4, modalM1Preserved: true }, aiModules, unrelatedBaseModules: 0, localLinksChecked: links, documentsSha256: Object.fromEntries(documents.map(file => [file, sha(readFileSync(file))])), artifactSha256: Object.fromEntries(outputs.map(file => [file, sha(readFileSync(`${directory}/${file}`))])) }
writeFileSync(`${directory}/verification.json`, JSON.stringify(receipt, null, 2) + '\n')
console.log(JSON.stringify({ status: 'passed', protectedSourceCount: protectedPaths.length, businessPilotChanges: [], versions, peerUnchanged: true, css: receipt.cssFirstPass, aiModules, localLinksChecked: links }, null, 2))
