import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { createHash } from 'node:crypto'
import { cp, mkdir, mkdtemp, readFile, realpath, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { promisify } from 'node:util'
import { packageContracts } from './release-contract.mjs'

const run = promisify(execFile)
const arg = name => {
  const index = process.argv.indexOf(name)
  return index < 0 ? undefined : process.argv[index + 1]
}
const out = path.resolve(arg('--out') ?? 'test-results/v2-ai-optional-consumer')
const packDir = path.resolve(arg('--pack-dir') ?? 'test-results/release-tarballs')
await mkdir(out, { recursive: true })
const consumer = await realpath(await mkdtemp(path.join(tmpdir(), 'aheart-ai-without-dnd-')))
const result = { status: 'failed', consumer, tarballs: [], commands: [] }

const capture = async (name, program, args) => {
  const record = { name, command: [program, ...args], exitCode: 0 }
  result.commands.push(record)
  try {
    const { stdout, stderr } = await run(program, args, { cwd: consumer, timeout: 180000, maxBuffer: 8 * 1024 * 1024 })
    await writeFile(path.join(out, name + '.log'), stdout + stderr)
  } catch (error) {
    record.exitCode = typeof error.code === 'number' ? error.code : 1
    await writeFile(path.join(out, name + '.log'), (error.stdout ?? '') + (error.stderr ?? error.message))
    throw error
  }
}

const write = (name, contents) => writeFile(path.join(consumer, name), contents)
try {
  const dependencies = { vue: '3.5.44', typescript: '5.9.3', vite: '5.0.12' }
  for (const { name, version } of packageContracts.filter(pkg => pkg.name !== '@aheart-ui/dnd')) {
    const filename = `${name.replace(/^@/, '').replace('/', '-')}-${version}.tgz`
    const tarball = path.join(packDir, filename)
    const sha256 = createHash('sha256').update(await readFile(tarball)).digest('hex')
    await cp(tarball, path.join(consumer, filename))
    dependencies[name] = `file:./${filename}`
    result.tarballs.push({ name, version, sha256 })
  }
  await write('package.json', JSON.stringify({ name: 'aheart-v2-ai-without-dnd', private: true, type: 'module', dependencies }))
  await capture('install', 'npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund', '--registry=https://registry.npmjs.org/'])
  const lock = JSON.parse(await readFile(path.join(consumer, 'package-lock.json'), 'utf8'))
  assert(!Object.keys(lock.packages).some(key => key.endsWith('node_modules/@aheart-ui/dnd')))
  await write('types.ts', `
import AI, { AIChatPanel } from '@aheart-ui/ai'
import { AIChatPanel as Chat, type AITransportV2 } from '@aheart-ui/ai/chat'
import type { App } from 'vue'
declare const app: App
declare const transport: AITransportV2
app.use(AI).component('ScopedChat', Chat)
const entries: [typeof AIChatPanel, typeof Chat, AITransportV2] = [Chat, AIChatPanel, transport]
void entries
`)
  await write('tsconfig.json', JSON.stringify({
    compilerOptions: {
      target: 'ES2022', module: 'ESNext', moduleResolution: 'Bundler', lib: ['ES2022', 'DOM', 'DOM.Iterable'],
      strict: true, skipLibCheck: false, noEmit: true
    },
    files: ['types.ts']
  }))
  await capture('strict-types', process.execPath, ['node_modules/typescript/bin/tsc', '-p', 'tsconfig.json'])
  await write('probe.mjs', `
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import RootAI, * as root from '@aheart-ui/ai'
import { AIChatPanel as Chat } from '@aheart-ui/ai/chat'
const require = createRequire(import.meta.url)
assert.throws(() => require.resolve('@aheart-ui/dnd/sortable'), { code: 'MODULE_NOT_FOUND' })
assert.equal(root.AIAgentWorkbench, undefined)
assert.equal(root.AIChatPanel, Chat)
assert.equal(require('@aheart-ui/ai').AIChatPanel, require('@aheart-ui/ai/chat').AIChatPanel)
const app = createSSRApp({ render: () => h(Chat, { transport: { async *send() {} } }) })
app.use(RootAI)
assert.equal(app.component('AAIAgentWorkbench'), undefined)
assert.match(await renderToString(app), /aheart-ai-chat-panel/)
for (const entry of ['workbench', 'full']) {
  await assert.rejects(import('@aheart-ui/ai/' + entry), { code: 'ERR_MODULE_NOT_FOUND', message: /@aheart-ui\\/dnd/ })
  assert.throws(() => require('@aheart-ui/ai/' + entry), { code: 'MODULE_NOT_FOUND', message: /@aheart-ui\\/dnd/ })
}
`)
  await capture('ssr-and-missing-peer', process.execPath, ['probe.mjs'])
  await write('index.html', '<div id="app"></div><script type="module" src="/main.js"></script>')
  await write('main.js', `
import { createApp, h } from 'vue'
import AI from '@aheart-ui/ai'
import { AIChatPanel as Chat } from '@aheart-ui/ai/chat'
import 'aheart-ui/theme.css'
import '@aheart-ui/ai/chat/style.css'
createApp({ render: () => h(Chat, { transport: { async *send() {} } }) }).use(AI).mount('#app')
`)
  await write('vite.config.mjs', `
import { writeFileSync } from 'node:fs'
import { defineConfig } from 'vite'
const parsed = []
export default defineConfig({
  plugins: [{
    name: 'aheart-optional-dnd-evidence',
    moduleParsed(info) {
      parsed.push(info.id.replace(process.cwd(), '<consumer>'))
    },
    buildEnd() {
      writeFileSync('module-graph.json', JSON.stringify(parsed.sort(), null, 2))
    }
  }]
})
`)
  await capture('production-build', process.execPath, ['node_modules/vite/bin/vite.js', 'build'])
  const graph = JSON.parse(await readFile(path.join(consumer, 'module-graph.json'), 'utf8'))
  assert(graph.some(id => id.includes('/@aheart-ui/ai/dist/esm/chat-panel.vue.js')))
  assert(!graph.some(id => /\/@aheart-ui\/dnd\/|agent-workbench\.vue|agent-execution\.vue/.test(id)))
  result.modules = graph.length
  result.dndInstalled = false
  result.missingPeerIdentifiesPackage = ['@aheart-ui/ai/workbench', '@aheart-ui/ai/full']
  result.status = 'passed'
} catch (error) {
  result.error = error.stack ?? error.message
  process.exitCode = 1
} finally {
  await writeFile(path.join(out, 'results.json'), JSON.stringify(result, null, 2) + '\n')
}
console.log(JSON.stringify({ status: result.status, modules: result.modules, error: result.error }))
