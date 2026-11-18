// Focused peer-stop evidence from real local tarballs; not full V1 acceptance.
import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { createHash } from 'node:crypto'
import { cp, lstat, mkdir, mkdtemp, readFile, realpath, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { promisify } from 'node:util'
import { gzipSync } from 'node:zlib'
import ts from 'typescript'

const root = fileURLToPath(new URL('../../..', import.meta.url))
const out = path.dirname(fileURLToPath(import.meta.url))
const run = promisify(execFile)
const sha = value => createHash('sha256').update(value).digest('hex')
const json = async file => JSON.parse(await readFile(file, 'utf8'))
const save = (file, value) => writeFile(path.join(out, file), JSON.stringify(value, null, 2) + '\n')
const manifest = await json(path.join(root, 'packages/components/src/constant/entries.json'))
const required = ['button', 'checkbox', 'date-picker', 'form', 'input', 'input-number', 'radio', 'select', 'switch', 'textarea', 'time-picker', 'tree-select', 'upload']
const allowed = [...new Set(required.flatMap(key => [key, ...manifest.base.find(entry => entry.subpath === key).dependencies]))].sort()
const consumer = await realpath(await mkdtemp(path.join(tmpdir(), 'aheart-v1-precise-')))
const result = { status: 'failed', scope: 'AIForm precise-import peer stop; not V1 acceptance or published-version compatibility', head: (await run('git', ['rev-parse', 'HEAD'], { cwd: root })).stdout.trim(), consumer, command: ['node', 'evidence/V1/aiform-precise-imports/probe.mjs'], tarballs: [], requiredDirectFamilies: required, permittedBaseFamilies: allowed, builds: {} }
await mkdir(out, { recursive: true })
const capture = async (name, command, args) => {
  const startedAt = new Date().toISOString()
  try {
    const done = await run(command, args, { cwd: consumer, timeout: 180000, maxBuffer: 32 * 1024 * 1024 })
    await writeFile(path.join(out, `${name}.txt`), (done.stdout + done.stderr).split('\n').map(line => line.trimEnd()).join('\n'))
    result.commands ??= []
    result.commands.push({ command: [command, ...args], startedAt, finishedAt: new Date().toISOString(), exitCode: 0, output: `${name}.txt` })
  } catch (error) {
    await writeFile(path.join(out, `${name}.txt`), `${error.stdout ?? ''}${error.stderr ?? error.message}`.split('\n').map(line => line.trimEnd()).join('\n'))
    result.commands ??= []
    result.commands.push({ command: [command, ...args], startedAt, finishedAt: new Date().toISOString(), exitCode: error.code ?? 1, output: `${name}.txt` })
    throw error
  }
}

try {
  const dependencies = { vue: '3.5.44', vite: '5.0.12', typescript: '5.9.3' }
  for (const dir of ['components', 'ai', 'dnd']) {
    const pkg = await json(path.join(root, `packages/${dir}/package.json`))
    const file = `${pkg.name.replace(/^@/, '').replaceAll('/', '-')}-${pkg.version}.tgz`
    const tarball = path.join(root, 'test-results/release-tarballs', file)
    result.tarballs.push({ name: pkg.name, version: pkg.version, sha256: sha(await readFile(tarball)) })
    await cp(tarball, path.join(consumer, file))
    dependencies[pkg.name] = `file:./${file}`
  }
  await writeFile(path.join(consumer, 'package.json'), JSON.stringify({ name: 'aheart-v1-precise-imports', private: true, type: 'module', dependencies }, null, 2))
  await capture('install', 'npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund'])
  await cp(path.join(consumer, 'package-lock.json'), path.join(out, 'package-lock.json'))
  for (const { name } of result.tarballs) {
    const installed = path.join(consumer, 'node_modules', name)
    assert.equal((await lstat(installed)).isSymbolicLink(), false)
    assert.equal(await realpath(installed), installed)
  }
  const imported = new Set()
  result.source = []
  for (const file of ['packages/ai/src/form.vue', 'packages/ai/src/form-field.vue']) {
    const contents = await readFile(path.join(root, file), 'utf8')
    const baseline = (await run('git', ['show', `e0c6f80:${file}`], { cwd: root })).stdout
    const withoutImports = raw => raw.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/g, (_, attrs, script) => {
      const tree = ts.createSourceFile(file, script, ts.ScriptTarget.Latest, true)
      for (const statement of [...tree.statements].reverse()) if (ts.isImportDeclaration(statement)) script = script.slice(0, statement.getStart(tree)) + script.slice(statement.end)
      return `<script${attrs}>${script}</script>`
    }).replace(/\n\s*\n/g, '\n')
    assert.equal(withoutImports(contents), withoutImports(baseline), `${file}: only import declarations may change`)
    for (const [, specifier] of contents.matchAll(/from ['"](aheart-ui[^'"]*)['"]/g)) {
      assert.notEqual(specifier, 'aheart-ui')
      if (specifier !== 'aheart-ui/tree') imported.add(specifier.slice('aheart-ui/'.length))
    }
    result.source.push({ file, sha256: sha(contents), bodyUnchangedExceptImports: true })
  }
  assert.deepEqual([...imported].sort(), required)
  for (const format of ['es', 'lib']) for (const file of ['form.vue.d.ts', 'form-field.vue.d.ts']) {
    const target = `packages/ai/${format}/${file}`
    const old = (await run('git', ['show', `e0c6f80:${target}`], { cwd: root })).stdout
    assert.equal(await readFile(path.join(root, target), 'utf8'), old, `${target}: public declaration changed`)
  }
  result.publicDeclarationsUnchanged = true
  const ai = await json(path.join(consumer, 'node_modules/@aheart-ui/ai/package.json'))
  result.peer = { source: (await json(path.join(root, 'packages/ai/package.json'))).peerDependencies['aheart-ui'], packed: ai.peerDependencies['aheart-ui'], requiredNext: '^1.4.0', status: 'unchanged; owner authorization required before adjustment; current unpublished core 1.3 candidate has new paths, published 1.3 does not' }
  assert.equal(result.peer.source, 'workspace:^1.1.0')
  assert.equal(result.peer.packed, '^1.1.0')

  await writeFile(path.join(consumer, 'node-probe.mjs'), `
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import Root, { AIForm } from '@aheart-ui/ai'
import Full from '@aheart-ui/ai/full'
import Scoped, { AIForm as Named, AI_FORM_FIELD_TYPES } from '@aheart-ui/ai/form'
const require = createRequire(import.meta.url)
assert.equal(Root, Full)
assert.equal(AIForm, Named)
assert.equal(Scoped, Named)
assert.equal((await import('@aheart-ui/ai/es/form/index.js')).default, Scoped)
assert.equal(require('@aheart-ui/ai/form').default, require('@aheart-ui/ai').AIForm)
assert.equal(require('@aheart-ui/ai/full').default, require('@aheart-ui/ai').default)
assert.equal(AI_FORM_FIELD_TYPES.length, 13)
assert.deepEqual(Object.keys(Scoped.props).sort(), ['modelValue','schema','disabled','submitting','submitText','submitError','validators'].sort())
assert.deepEqual([...Scoped.emits].sort(), ['update:modelValue','submit','schema-error','validation-error'].sort())
const fields=AI_FORM_FIELD_TYPES.map((type, i)=>({key:'field'+i,label:type,type,...(['select','checkbox','radio','tree-select'].includes(type)?{options:[{label:'A',value:'a'}]}:{})}))
const html=await renderToString(createSSRApp({render:()=>h(Scoped,{schema:{version:'1',fields}})}))
assert.ok(html.includes('aheart-ai-form'))
assert.ok(!html.includes('表单配置无效'))
assert.equal((html.match(/data-field-key=/g)??[]).length,13)
assert.equal(typeof window,'undefined')
console.log('ESM/CJS/root/full/scoped/legacy object identity, unchanged props/events and all 13 fields SSR passed')
`)
  await capture('node-probe', process.execPath, ['node-probe.mjs'])
  await writeFile(path.join(consumer, 'types.ts'), `
import { h } from 'vue'
import AIForm, { type AIFormSchemaV1, type AIFormFieldType } from '@aheart-ui/ai/form'
import { Form, FormItem, type FormRule } from 'aheart-ui/form'
import { DatePicker, DateRangePicker } from 'aheart-ui/date-picker'
import { TimePicker, TimeRangePicker } from 'aheart-ui/time-picker'
import { TreeSelect } from 'aheart-ui/tree-select'
import { Upload, type UploadFile } from 'aheart-ui/upload'
import type { TreeNodeData } from 'aheart-ui/tree'
const fields: AIFormFieldType[] = ['input','textarea','number','select','checkbox','radio','switch','date','date-range','time','time-range','upload','tree-select']
const schema: AIFormSchemaV1 = {version:'1',fields:fields.map((type,i)=>({key:String(i),label:type,type}))}
export const form = h(AIForm,{schema})
export type Instance = InstanceType<typeof AIForm>
export const expose = (value: Instance) => [value.validate(), value.resetFields(), value.clearValidate(), value.setFieldsErrors([])]
export const components = [Form,FormItem,DatePicker,DateRangePicker,TimePicker,TimeRangePicker,TreeSelect,Upload]
export const rule: FormRule = {required:true}
export const files: UploadFile[] = []
export const tree: TreeNodeData[] = []
`)
  await writeFile(path.join(consumer, 'tsconfig.json'), JSON.stringify({ compilerOptions: { strict: true, skipLibCheck: false, noEmit: true, module: 'ESNext', moduleResolution: 'Bundler', target: 'ES2020', lib: ['ES2020', 'DOM'], types: [] }, files: ['types.ts'] }, null, 2))
  await capture('strict-types', process.execPath, ['node_modules/typescript/bin/tsc', '-p', 'tsconfig.json', '--pretty', 'false'])
  await writeFile(path.join(consumer, 'index.html'), '<!doctype html><html><body><div id="app"></div><script type="module" src="/main.js"></script></body></html>')
  const { build } = await import(pathToFileURL(path.join(consumer, 'node_modules/vite/dist/node/index.js')).href)
  for (const [mode, code] of [
    ['scoped', "import {AIForm as C} from '@aheart-ui/ai/form';createApp({render:()=>h(C,{schema:{version:'1',fields:[]}})}).mount('#app')"],
    ['root-named', "import {AIForm as C} from '@aheart-ui/ai';createApp({render:()=>h(C,{schema:{version:'1',fields:[]}})}).mount('#app')"],
    ['full', "import Plugin from '@aheart-ui/ai/full';const app=createApp({render:()=>h(resolveComponent('AAIForm'),{schema:{version:'1',fields:[]}})});app.use(Plugin);app.mount('#app')"]
  ]) {
    await writeFile(path.join(consumer, 'main.js'), `import {createApp,h,resolveComponent} from 'vue';${code}`)
    const parsed = new Set(), rendered = []
    const bundles = await build({ root: consumer, configFile: false, logLevel: 'error', build: { minify: true, write: false }, plugins: [{ name: 'v1-precise-evidence', moduleParsed(info) { parsed.add(info.id.replaceAll(consumer, '<consumer>')) }, generateBundle(_options, bundle) { for (const chunk of Object.values(bundle)) if (chunk.type === 'chunk') for (const [id, info] of Object.entries(chunk.modules)) rendered.push({ id: id.replaceAll(consumer, '<consumer>'), renderedLength: info.renderedLength }) } }] })
    const outputs = (Array.isArray(bundles) ? bundles : [bundles]).flatMap(bundle => bundle.output)
    const assets = outputs.map(item => { const contents = item.type === 'chunk' ? item.code : item.source; return { file: item.fileName, bytes: Buffer.byteLength(contents), gzipBytes: gzipSync(contents).length } })
    const ids = [...parsed].sort()
    await save(`${mode}-module-graph.json`, { parsed: ids, rendered, assets })
    assert.equal(assets.filter(item => item.file.endsWith('.css')).length, 0, 'JS imports must not introduce implicit CSS')
    result.builds[mode] = { jsGzip: assets.filter(item => item.file.endsWith('.js')).reduce((sum, item) => sum + item.gzipBytes, 0), parsedCount: ids.length }
    if (mode === 'scoped') {
      const unrelated = ids.filter(id => {
        const match = /\/node_modules\/aheart-ui\/es\/([^/]+)(?:\/|$)/.exec(id)
        return match && ![...allowed, 'utils', 'config', 'picker-core'].includes(match[1])
      })
      const baseRootBarrel = ids.includes('<consumer>/node_modules/aheart-ui/es/index.js')
      result.graph = { oldUnrelatedCount: 106, unrelatedBaseModules: unrelated, baseRootBarrelParsed: baseRootBarrel, actualBaseFamilies: [...new Set(ids.map(id => /\/node_modules\/aheart-ui\/es\/([^/]+)\//.exec(id)?.[1]).filter(Boolean))].sort(), sharedInfrastructureModules: ids.filter(id => /\/node_modules\/aheart-ui\/es\/(utils|config|picker-core)\//.test(id)) }
      assert.deepEqual(unrelated, [], 'AIForm parsed undeclared base modules')
      assert.equal(baseRootBarrel, false, 'AIForm still parses the core root barrel')
    }
  }
  const selected = result.builds.scoped.jsGzip, named = result.builds['root-named'].jsGzip, full = result.builds.full.jsGzip
  result.jsBudget = { scopedGzip: selected, rootNamedGzip: named, fullPluginGzip: full, increment: selected - named, allowedIncrement: Math.max(512, named * 0.01), smallerThanFull: selected < full, rootNamedIncrementPass: selected <= named + Math.max(512, named * 0.01) }
  assert.ok(result.jsBudget.smallerThanFull)
  assert.ok(result.jsBudget.rootNamedIncrementPass)
  const core = path.join(consumer, 'node_modules/aheart-ui')
  const fullCss = await readFile(path.join(core, 'es/full.css')), theme = await readFile(path.join(core, 'es/theme.css'))
  const oldFull = (await run('git', ['show', 'b1eef9b6:packages/components/es/full.css'], { cwd: root, encoding: 'buffer' })).stdout
  assert.equal(sha(fullCss), sha(oldFull), 'full.css denominator changed')
  assert.ok(theme.length <= fullCss.length * 0.05)
  const classification = await json(path.join(root, 'evidence/V1/classification/approved.json'))
  const compositeEntries = []
  for (const entry of classification.entries.filter(entry => entry.classification === 'composite')) {
    const spec = manifest[entry.domain].find(candidate => candidate.subpath === entry.subpath)
    const packageName = entry.domain === 'base' ? 'aheart-ui' : '@aheart-ui/ai'
    const file = `es/${spec.styleOutput ?? `${spec.subpath}/style.css`}`
    const css = await readFile(path.join(consumer, 'node_modules', packageName, file))
    const complete = entry.domain === 'base' || ['bubble', 'chat-panel', 'chat'].includes(entry.subpath)
    const row = { entry: `${packageName}/${entry.subpath}`, classification: 'composite', packedStyle: `${packageName}/${file}`, packedStyleSha256: sha(css), modalM1Protection: entry.domain === 'base' && entry.subpath === 'modal' }
    if (complete) {
      Object.assign(row, { measurement: 'complete existing public style export; no missing cross-package style dependency', componentBytes: css.length, fractionOfFull: css.length / fullCss.length, themePlusBytes: css.length + theme.length, themePlusFraction: (css.length + theme.length) / fullCss.length, componentPass: css.length <= fullCss.length * 0.25, themePlusPass: css.length + theme.length <= fullCss.length * 0.30 })
      assert.ok(row.componentPass && row.themePlusPass, `${row.entry}: existing complete closure exceeded leaf line; stop without loosening`)
      row.finalGate = 'leaf-hard; locked by owner first-pass rule, no later union fallback'
    } else Object.assign(row, { firstPass: 'pending complete public cross-package style closure', finalGate: 'pending; no union exception selected', warning: 'own/AI-local CSS alone omits required base and/or DND dependencies; not measured as complete' })
    compositeEntries.push(row)
  }
  result.css = { fullBytes: fullCss.length, fullSha256: sha(fullCss), fullMatchesV0: true, themeBytes: theme.length, themeFraction: theme.length / fullCss.length, themePass: true, leafHardLocked: compositeEntries.filter(entry => entry.finalGate.startsWith('leaf-hard')).length, pendingCompleteFirstPass: compositeEntries.filter(entry => entry.firstPass).length, compositeEntries, status: 'first-pass measurements and hard locks only; exact-union gate and four complete cross-package exports not yet implemented or accepted', nextPolicy: 'measure every composite against 25%/30% first; passing composites lock leaf-hard; only measured failures are eligible for exact-union/ratchet; Modal remains leaf-hard; theme 5% unchanged' }
  await save('composite-css-first-pass.json', result.css)
  result.status = 'passed'
} catch (error) {
  result.error = error.stack ?? String(error)
  process.exitCode = 1
}
await save('results.json', result)
await writeFile(path.join(out, 'exit-code'), result.status === 'passed' ? '0\n' : '1\n')
console.log(JSON.stringify({ status: result.status, graph: result.graph, jsBudget: result.jsBudget, peer: result.peer, error: result.error }, null, 2))
