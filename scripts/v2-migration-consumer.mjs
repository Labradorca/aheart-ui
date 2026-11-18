import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { createHash } from 'node:crypto'
import { cp, mkdir, mkdtemp, readFile, realpath, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { promisify } from 'node:util'
import { packageContracts } from './release-contract.mjs'
import { migrateSource } from './codemods/aheart-v2.mjs'

const root = fileURLToPath(new URL('..', import.meta.url)), run = promisify(execFile)
const index = process.argv.indexOf('--out'), output = path.resolve(index < 0 ? 'test-results/v2-migration-consumer' : process.argv[index + 1])
const consumer = await realpath(await mkdtemp(path.join(tmpdir(), 'aheart-migration-')))
await mkdir(output, { recursive: true })
const result = { status: 'failed', scope: 'current 1.4/AI1.2 tarballs validate v2 migration tooling; not a v2 implementation or release', consumer, tarballs: [], commands: [], warnings: {} }
const hash = data => createHash('sha256').update(data).digest('hex')
const capture = async (name, command, args) => {
  try {
    const done = await run(command, args, { cwd: consumer, maxBuffer: 32 * 1024 * 1024, timeout: 180000 })
    const text = (done.stdout + done.stderr).trimEnd()
    await writeFile(path.join(output, `${name}.log`), text ? text + '\n' : '')
    result.commands.push({ command: [command, ...args], exitCode: 0, output: `${name}.log` })
  } catch (error) {
    await writeFile(path.join(output, `${name}.log`), `${error.stdout ?? ''}${error.stderr ?? error.message}`.trimEnd() + '\n')
    result.commands.push({ command: [command, ...args], exitCode: error.code ?? 1, output: `${name}.log` })
    throw error
  }
}
try {
  // Tooling SDK uses the workspace AI build's patched Vite. Numeric budgets
  // remain pinned independently to M1's Vite 5.0.12 in v1-consumer.mjs.
  const dependencies = { vue: '3.5.44', vite: '5.4.21', '@vitejs/plugin-vue': '5.0.3', typescript: '5.9.3', '@types/node': '24.10.1' }
  result.tools = { vue: dependencies.vue, vite: dependencies.vite, typescript: dependencies.typescript, nodeTypes: dependencies['@types/node'] }
  for (const pkg of packageContracts) {
    const file = `${pkg.name.replace(/^@/, '').replaceAll('/', '-')}-${pkg.version}.tgz`
    const tarball = path.join(root, 'test-results/release-tarballs', file)
    await cp(tarball, path.join(consumer, file))
    dependencies[pkg.name] = `file:./${file}`
    result.tarballs.push({ name: pkg.name, version: pkg.version, sha256: hash(await readFile(tarball)) })
  }
  await writeFile(path.join(consumer, 'package.json'), JSON.stringify({ name: 'aheart-migration-consumer', private: true, type: 'module', dependencies }, null, 2))
  await capture('install', 'npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund'])
  await cp(path.join(consumer, 'package-lock.json'), path.join(output, 'package-lock.json'))
  const { createServer, build, createLogger } = await import(pathToFileURL(path.join(consumer, 'node_modules/vite/dist/node/index.js')).href)
  const { default: vue } = await import(pathToFileURL(path.join(consumer, 'node_modules/@vitejs/plugin-vue/dist/index.mjs')).href)
  const { AheartV2DeprecationDiagnostics } = await import(pathToFileURL(path.join(consumer, 'node_modules/aheart-ui/es/resolver/index.js')).href)
  const legacy = "import UI, {Button} from 'aheart-ui';import {AIAgentWorkbench as Workbench} from '@aheart-ui/ai';import {Select} from 'aheart-ui/es/select/index.js';console.log(UI,Button,Workbench,Select)"
  const migrated = migrateSource(legacy, 'fixture.js')
  assert.equal(migrated.changed, true)
  assert.equal(migrated.manual.length, 0)
  assert.equal(migrateSource(migrated.source).changed, false)
  await writeFile(path.join(consumer, 'legacy.js'), legacy)
  await writeFile(path.join(consumer, 'migrated.js'), migrated.source)
  await writeFile(path.join(output, 'before.js'), legacy + '\n')
  await writeFile(path.join(output, 'after.js'), migrated.source + '\n')
  await writeFile(path.join(consumer, 'Example.vue'), '<template><div /></template><script setup lang="ts">import UI from "aheart-ui";import{AIAgentWorkbench}from"@aheart-ui/ai";const version:string="v1";console.log(UI,AIAgentWorkbench,version)</script>')
  const logger = createLogger('silent'), warnings = []
  logger.warn = message => warnings.push(message)
  const server = await createServer({ root: consumer, configFile: false, customLogger: logger, plugins: [vue(), AheartV2DeprecationDiagnostics()], server: { middlewareMode: true, hmr: false }, optimizeDeps: { noDiscovery: true, include: [] }, appType: 'custom' })
  try {
    await server.transformRequest('/legacy.js')
    await server.transformRequest('/Example.vue')
    const before = warnings.filter(message => /\[AheartUI B[13]\]/.test(message))
    assert.ok(before.some(message => message.includes('B1')) && before.some(message => message.includes('B3')), 'actual Vite development transform did not diagnose legacy imports')
    assert.equal(before.length, 4, 'both JS and Vue SFC must receive B1 and B3 diagnostics')
    const count = before.length
    await server.transformRequest('/migrated.js')
    assert.equal(warnings.filter(message => /\[AheartUI B[13]\]/.test(message)).length, count, 'recommended imports produced deprecation warnings')
    result.warnings.development = before
  } finally { await server.close() }
  const production = [], prodLogger = createLogger('silent')
  prodLogger.warn = message => production.push(message)
  for (const file of ['legacy.js', 'migrated.js']) {
    const bundles = await build({ root: consumer, configFile: false, customLogger: prodLogger, plugins: [AheartV2DeprecationDiagnostics()], build: { write: false, minify: true, rollupOptions: { input: path.join(consumer, file) } } })
    const chunks = (Array.isArray(bundles) ? bundles : [bundles]).flatMap(bundle => bundle.output).filter(asset => asset.type === 'chunk')
    assert.ok(chunks.length > 0)
    assert.ok(chunks.every(chunk => !chunk.code.includes('[AheartUI B')), 'production JS contained diagnostic messages')
  }
  result.warnings.production = production.filter(message => /\[AheartUI B[13]\]/.test(message))
  assert.deepEqual(result.warnings.production, [])
  const cjs = migrateSource("const UI=require('aheart-ui').default;const WB=require('@aheart-ui/ai').AIAgentWorkbench;module.exports={UI,WB}", 'before.cjs')
  await writeFile(path.join(consumer, 'migrated.cjs'), cjs.source)
  await writeFile(path.join(consumer, 'cjs-probe.cjs'), "const assert=require('node:assert/strict'),c=require('./migrated.cjs');assert.equal(c.UI,require('aheart-ui').default);assert.equal(c.WB,require('@aheart-ui/ai').AIAgentWorkbench)")
  await capture('cjs-identity', process.execPath, ['cjs-probe.cjs'])
  await writeFile(path.join(consumer, 'plugin-types.ts'), "import {defineConfig}from'vite';import vue from'@vitejs/plugin-vue';import{AheartV2DeprecationDiagnostics}from'aheart-ui/resolver';export default defineConfig({plugins:[vue(),AheartV2DeprecationDiagnostics()]})")
  await writeFile(path.join(consumer, 'tsconfig.json'), JSON.stringify({ compilerOptions: { strict: true, skipLibCheck: false, noEmit: true, module: 'ESNext', moduleResolution: 'Bundler', target: 'ES2020', lib: ['ES2020', 'DOM'], types: ['node'], esModuleInterop: true }, files: ['plugin-types.ts'] }, null, 2))
  await capture('strict-plugin-types', process.execPath, ['node_modules/typescript/bin/tsc', '-p', 'tsconfig.json', '--pretty', 'false'])
  result.status = 'passed'
} catch (error) { result.error = error.stack ?? String(error); process.exitCode = 1 }
await writeFile(path.join(output, 'results.json'), JSON.stringify(result, null, 2) + '\n')
await writeFile(path.join(output, 'exit-code'), result.status === 'passed' ? '0\n' : '1\n')
console.log(JSON.stringify({ status: result.status, warnings: result.warnings, error: result.error }, null, 2))
