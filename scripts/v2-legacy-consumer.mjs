import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdir, mkdtemp, readFile, realpath, rm, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { packageContracts } from './release-contract.mjs'

const arg = name => {
  const index = process.argv.indexOf(name)
  return index < 0 ? undefined : process.argv[index + 1]
}
const baselineDir = path.resolve(arg('--baseline-dir') ?? 'test-results/v2-baseline/packs')
const candidateDir = path.resolve(arg('--pack-dir') ?? 'test-results/release-tarballs')
const output = path.resolve(arg('--out') ?? 'test-results/v2-legacy-consumer/results.json')
const registry = JSON.parse(await readFile(new URL('../evidence/V2/baseline/registry.json', import.meta.url), 'utf8'))
const temporary = await realpath(await mkdtemp(path.join(tmpdir(), 'aheart-v2-legacy-')))
const results = { status: 'failed', packages: [] }

const packFilename = ({ name, version }) => `${name.replace(/^@/, '').replace('/', '-')}-${version}.tgz`
const archiveFiles = tarball => execFileSync('tar', ['-tzf', tarball], { encoding: 'utf8' })
  .trim().split('\n').filter(file => /^package\/(?:es|lib)\/.+/.test(file))
const packageRoot = (lane, pkg) => path.join(temporary, lane, 'node_modules', pkg)
const unpack = async (tarball, directory) => {
  await mkdir(directory, { recursive: true })
  execFileSync('tar', ['-xzf', tarball, '--strip-components=1', '-C', directory])
}
const resolve = (lane, request) => {
  try {
    const require = createRequire(path.join(temporary, lane, 'probe.cjs'))
    return { file: require.resolve(request) }
  } catch (error) {
    return { error: error.code }
  }
}

try {
  for (const contract of packageContracts) {
    const baseline = registry.packages.find(pkg => pkg.name === contract.name)
    const oldPack = path.join(baselineDir, baseline.filename)
    const bytes = await readFile(oldPack)
    assert.equal(createHash('sha256').update(bytes).digest('hex'), baseline.sha256)
    const newPack = path.join(candidateDir, packFilename(contract))
    await unpack(oldPack, packageRoot('old', contract.name))
    await unpack(newPack, packageRoot('new', contract.name))
    const record = { name: contract.name, paths: 0, resolvable: 0, private: 0, styles: 0, differences: [] }
    results.packages.push(record)
    for (const member of archiveFiles(oldPack)) {
      const relative = member.slice('package/'.length)
      const request = `${contract.name}/${relative}`
      const previous = resolve('old', request)
      const current = resolve('new', request)
      record.paths++
      if (previous.error !== current.error) {
        record.differences.push({ request, previous: previous.error ?? 'resolved', current: current.error ?? 'resolved' })
        continue
      }
      if (previous.error) {
        record.private++
        continue
      }
      record.resolvable++
      if (!contract.dist) continue
      const facade = path.relative(packageRoot('new', contract.name), current.file)
      if (facade !== path.join('dist', 'compat', relative)) record.differences.push({ request, facade })
      if (relative.endsWith('.css')) {
        assert.deepEqual(await readFile(current.file), await readFile(previous.file), request + ' CSS changed')
        record.styles++
      }
    }
  }
  assert(results.packages.every(pkg => pkg.differences.length === 0), 'legacy path resolution changed')
  results.status = 'passed'
} catch (error) {
  results.error = error.message
  process.exitCode = 1
} finally {
  await mkdir(path.dirname(output), { recursive: true })
  await writeFile(output, JSON.stringify(results, null, 2) + '\n')
  await rm(temporary, { recursive: true, force: true })
}
console.log(JSON.stringify({
  status: results.status,
  error: results.error,
  packages: results.packages.map(({ differences, ...summary }) => ({
    ...summary,
    differenceCount: differences.length,
    examples: differences.slice(0, 3)
  })),
  output
}, null, 2))
