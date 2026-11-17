import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import { parseReadyComponentKeys } from '../../scripts/quality-matrix.mjs'
import { qualityMatrix } from '../../docs/.vitepress/data/quality-matrix.mjs'

// Read-only upstream/source audit. Run from the repository root; never publishes.
const observations = []
function command(args) {
  try {
    const stdout = execFileSync(args[0], args.slice(1), { encoding: 'utf8' })
    observations.push({ command: args, exitCode: 0 })
    return stdout.trim()
  } catch (error) {
    observations.push({ command: args, exitCode: error.status, error: String(error.stderr) })
    return null
  }
}
const api = (path) => {
  const value = command(['gh', 'api', path])
  return value === null ? null : JSON.parse(value)
}
const select = (object, fields) => object && Object.fromEntries(fields.map((field) => [field, object[field]]))
const repository = 'Labradorca/aheart-ui'
const baseline = '735d3d33e0e5a770c5cb83f782dbe33016b4ada7'
const worktreeHead = command(['git', 'rev-parse', 'HEAD'])
const facts = { observedAt: new Date().toISOString(), baseline, worktreeHead, repository, commands: observations }
facts.pullRequests = []
for (const number of [43, 44, 50]) {
  const pr = api(`repos/${repository}/pulls/${number}`)
  facts.pullRequests.push(pr && {
    ...select(pr, ['number', 'title', 'state', 'html_url', 'merged', 'merged_at', 'merge_commit_sha']),
    head: pr.head.sha, base: pr.base.sha,
    reviews: number === 50 ? undefined : api(`repos/${repository}/pulls/${number}/reviews`)
      ?.map((review) => ({ ...select(review, ['state', 'submitted_at', 'html_url', 'body']), user: review.user.login })),
    comments: number === 50 ? undefined : api(`repos/${repository}/issues/${number}/comments`)
      ?.map((comment) => ({ ...select(comment, ['created_at', 'html_url', 'body']), user: comment.user.login })),
    files: number === 50 ? api(`repos/${repository}/pulls/${number}/files?per_page=100`)?.map((file) => file.filename) : undefined
  })
}
facts.mainRuns = []
for (const sha of [...facts.pullRequests.filter((pr) => pr?.merged).map((pr) => pr.merge_commit_sha), baseline]) {
  const runs = api(`repos/${repository}/actions/runs?head_sha=${sha}&per_page=100`)
  facts.mainRuns.push({ sha, runs: runs?.workflow_runs.map((run) => select(run,
    ['id', 'name', 'head_sha', 'head_branch', 'event', 'status', 'conclusion', 'html_url', 'created_at', 'updated_at'])) ?? null })
}
const release = api(`repos/${repository}/releases/tags/v1.3.0`)
facts.release = release && { ...select(release, ['html_url', 'tag_name', 'target_commitish', 'published_at', 'body']),
  assets: release.assets.map((asset) => select(asset, ['name', 'browser_download_url', 'size', 'digest'])) }
facts.releaseTagSha = command(['git', 'rev-list', '-n', '1', 'v1.3.0'])
facts.jobs = []
for (const id of [42963104012, 42984728965, 43912659909, 42966860141, 43920744949]) {
  const jobs = api(`repos/${repository}/actions/runs/${id}/jobs?per_page=100`)
  facts.jobs.push({ runId: id, jobs: jobs?.jobs.map((job) => select(job,
    ['name', 'status', 'conclusion', 'html_url'])) ?? null })
}
facts.pages = api(`repos/${repository}/pages`)
facts.deployments = api(`repos/${repository}/deployments?environment=github-pages&per_page=100`)
  ?.map((deployment) => select(deployment, ['id', 'sha', 'ref', 'created_at', 'statuses_url']))
facts.pagesStatuses = facts.deployments?.filter((deployment) =>
  [baseline, ...facts.pullRequests.filter((pr) => pr?.merged).map((pr) => pr.merge_commit_sha)].includes(deployment.sha))
  .map((deployment) => ({ id: deployment.id, sha: deployment.sha,
    statuses: api(`repos/${repository}/deployments/${deployment.id}/statuses`)
      ?.map((status) => select(status, ['state', 'environment_url', 'log_url', 'created_at'])) }))
facts.npm = []
for (const name of ['aheart-ui', '@aheart-ui/ai', '@aheart-ui/dnd']) {
  const result = command(['npm', 'view', name, 'version', 'dist-tags', 'dist.integrity', 'gitHead', '--json', '--registry=https://registry.npmjs.org'])
  facts.npm.push({ name, result: result === null ? null : JSON.parse(result) })
}
const entries = JSON.parse(readFileSync('packages/components/src/constant/entries.json', 'utf8'))
const ready = parseReadyComponentKeys(readFileSync('docs/.vitepress/data/components.ts', 'utf8'))
const ledger = JSON.parse(readFileSync('docs/superpowers/evidence/d9-skip-ledger.json', 'utf8'))
facts.inventory = { readyCount: ready.length, ready, skipSites: ledger.sites.length,
  readyByPackage: Object.fromEntries([...new Set(qualityMatrix.map((item) => item.package))]
    .map((name) => [name, qualityMatrix.filter((item) => item.package === name).length])),
  entries: Object.fromEntries(Object.entries(entries).map(([domain, items]) => [domain, { count: items.length, subpaths: items.map((item) => item.subpath) }])) }
facts.sourceHashes = Object.fromEntries([
  'docs/superpowers/evidence/d9-skip-ledger.json', 'packages/components/src/constant/entries.json',
  'docs/.vitepress/data/components.ts', 'docs/.vitepress/theme/V2Roadmap.vue'
].map((file) => [file, createHash('sha256').update(readFileSync(file)).digest('hex')]))
writeFileSync('evidence/V0/facts.json', `${JSON.stringify(facts, null, 2)}\n`)
console.log(JSON.stringify({ baseline, inventory: facts.inventory, mainRuns: facts.mainRuns,
  release: facts.release?.html_url, releaseTagSha: facts.releaseTagSha,
  failedCommands: observations.filter((item) => item.exitCode !== 0) }, null, 2))
if (observations.some((item) => item.exitCode !== 0)) process.exitCode = 1
