import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const out = path.resolve(process.argv[2] ?? 'test-results/v2-alpha')
const json = async file => JSON.parse(await readFile(path.join(out, file), 'utf8'))
const pilots = await json('pilot-chromium/results.json')
const consumer = await json('v1/results.json')
const visual = await json('visual/results.json')
for (const report of [pilots, consumer, visual]) assert.equal(report.status, 'passed')
assert.equal(pilots.entryMode, 'migrated')
for (const pkg of visual.tarballs) {
  const expected = pilots.candidatePackages[pkg.name]
  assert.equal(pkg.sha256, expected.sha256)
  assert.equal(pkg.version, pkg.name === '@aheart-ui/dnd' ? '1.1.0' : '2.0.0-alpha.0')
}
const targets = [
  ...pilots.pilots.map(pilot => ({ root: pilot.project, viteRoot: pilot.project, page: 'ssr.html' })),
  { root: path.join(consumer.consumer, 'visual-contract'), viteRoot: consumer.consumer, page: 'scoped.html' }
]
const servers = []
const close = () => Promise.all(servers.map(server => new Promise(resolve => server.httpServer.close(resolve))))
process.once('SIGINT', close)
process.once('SIGTERM', close)
try {
  for (const [index, target] of targets.entries()) {
    const { preview } = await import(pathToFileURL(path.join(target.viteRoot, 'node_modules/vite/dist/node/index.js')).href)
    const port = 5281 + index
    const server = await preview({
      root: target.root,
      configFile: false,
      logLevel: 'error',
      build: { outDir: 'dist' },
      preview: { host: '127.0.0.1', port, strictPort: true }
    })
    servers.push(server)
    console.log(`http://127.0.0.1:${port}/${target.page}`)
  }
} catch (error) {
  await close()
  throw error
}
