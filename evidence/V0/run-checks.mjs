import { execFileSync, spawnSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'

// Capture each command and exit code without hiding a failure behind a shell pipe.
const baseline = execFileSync('git', ['merge-base', 'HEAD', 'origin/master'], { encoding: 'utf8' }).trim()
const worktreeHead = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim()
const checks = [
  ['docs-and-matrix', ['node', '--test',
    'scripts/docs-copy.test.mjs', 'scripts/docs-social-icon.test.mjs',
    'scripts/qg5-evidence-docs.test.mjs', 'scripts/m3-doc-entries.test.mjs',
    'scripts/quality-matrix.test.mjs', 'scripts/qg5-skip-ledger.test.mjs']],
  ['docs-build', ['corepack', 'pnpm', 'docs:build']],
  ['diff-check', ['git', 'diff', '--check']],
  ['staged-diff-check', ['git', 'diff', '--cached', '--check']]
]
const requested = new Set(process.argv.slice(2))
const results = requested.size ? JSON.parse(readFileSync('evidence/V0/checks/results.json', 'utf8')) : []
for (const [name, command] of checks.filter(([name]) => !requested.size || requested.has(name))) {
  const startedAt = new Date().toISOString()
  const result = spawnSync(command[0], command.slice(1), { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 })
  const output = `${result.stdout ?? ''}${result.stderr ?? ''}${result.error ? String(result.error) : ''}`
  writeFileSync(`evidence/V0/checks/${name}.txt`, output)
  const previous = results.findIndex((entry) => entry.name === name)
  if (previous !== -1) results.splice(previous, 1)
  results.push({ name, command, baseline, worktreeHead, scope: 'recorded HEAD plus V0 working diff',
    startedAt, finishedAt: new Date().toISOString(), exitCode: result.status,
    signal: result.signal, output: `${name}.txt` })
  console.log(`${name}: exit ${result.status}`)
}
writeFileSync('evidence/V0/checks/results.json', `${JSON.stringify(results, null, 2)}\n`)
const prior = readFileSync('evidence/V0/checks/README.md', 'utf8')
const summary = results.map((result) => `| ${result.name} | \`${result.command.join(' ')}\` | ${result.exitCode} | [输出](${result.output}) |`).join('\n')
writeFileSync('evidence/V0/checks/README.md', `${prior.split('<!-- generated results -->')[0]}<!-- generated results -->\n\n| 检查 | 命令 | 退出码 | 输出 |\n| --- | --- | --- | --- |\n${summary}\n`)
if (results.some((result) => result.exitCode !== 0)) process.exitCode = 1
