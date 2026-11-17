// Review evidence only; does not apply classifications or change V1 gates.
import assert from 'node:assert/strict'
import { readFileSync, existsSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import path from 'node:path'

const read = file => JSON.parse(readFileSync(file, 'utf8'))
const git = args => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }).trim()
const sha = content => createHash('sha256').update(content).digest('hex')
writeFileSync('evidence/V1/classification/verification.json', JSON.stringify({ status: 'running; not an acceptance result', startedAt: new Date().toISOString() }) + '\n')
const manifest = read('packages/components/src/constant/entries.json')
const proposal = read('evidence/V1/classification/proposal.json')
const expected = ['base', 'ai', 'dnd'].flatMap(domain => manifest[domain].map(entry => `${domain}/${entry.subpath}`)).sort()
const actual = proposal.entries.map(entry => `${entry.domain}/${entry.subpath}`).sort()
assert.equal(new Set(actual).size, actual.length)
assert.deepEqual(actual, expected)
assert.ok(proposal.entries.every(entry => entry.status === 'pending_owner_confirmation'))
const counts = Object.fromEntries(['base', 'ai', 'dnd'].map(domain => [domain, Object.fromEntries(['composite', 'leaf'].map(kind => [kind, proposal.entries.filter(entry => entry.domain === domain && entry.proposedClass === kind).length]))]))
assert.deepEqual(counts, { base: { composite: 5, leaf: 40 }, ai: { composite: 7, leaf: 9 }, dnd: { composite: 0, leaf: 4 } })

let sourceHashesChecked = 0
for (const entry of read('evidence/V1/classification/source-evidence.json').entries) {
  for (const [file, expectedSha] of Object.entries(entry.sourceSha256)) {
    assert.equal(sha(readFileSync(file)), expectedSha, file)
    sourceHashesChecked++
  }
}
const implementationPaths = ['packages', 'scripts', 'pnpm-lock.yaml', '.github']
const guards = ['631b7cd', '4f2762a'].map(baseline => {
  const command = ['diff', baseline, '--name-only', '--', ...implementationPaths]
  assert.equal(git(command), '', `implementation changed since ${baseline}`)
  return { command: ['git', ...command], exitCode: 0, output: '' }
})
const versions = Object.fromEntries(['components', 'ai', 'dnd'].map(name => [name, read(`packages/${name}/package.json`).version]))
assert.deepEqual(versions, { components: '1.3.0', ai: '1.1.0', dnd: '1.1.0' })
assert.equal(read('packages/ai/package.json').peerDependencies['aheart-ui'], 'workspace:^1.1.0')

const documents = ['docs/superpowers/plans/2026-11-17-aiform-on-demand-feasibility.md', 'evidence/V1/decision-log.md', 'evidence/V1/owner-a2-3-clarification-2026-11-17.md', 'evidence/V1/aiform-budget/README.md', 'evidence/V1/aiform-design/README.md', 'evidence/V1/diff-summary.md', 'evidence/V1/classification/README.md']
let localLinksChecked = 0
for (const file of documents) {
  for (const [, target] of readFileSync(file, 'utf8').matchAll(/\]\(([^)]+)\)/g)) {
    if (/^(?:https?:|#)/.test(target)) continue
    const destination = decodeURIComponent(target.split('#')[0])
    assert.ok(existsSync(path.resolve(path.dirname(file), destination)), `${file}: missing ${target}`)
    localLinksChecked++
  }
}
const record = { checkedAt: new Date().toISOString(), head: git(['rev-parse', 'HEAD']), status: 'review evidence passed; classification pending; not V1 acceptance', logicalEntries: actual.length, counts, sourceHashesChecked, localLinksChecked, guards, versions, aiPeerUnchanged: 'workspace:^1.1.0', documents: Object.fromEntries(documents.map(file => [file, sha(readFileSync(file))])) }
writeFileSync('evidence/V1/classification/verification.json', JSON.stringify(record, null, 2) + '\n')
console.log(JSON.stringify({ logicalEntries: actual.length, counts, sourceHashesChecked, localLinksChecked, implementationUnchanged: true, aiPeerUnchanged: true }, null, 2))
