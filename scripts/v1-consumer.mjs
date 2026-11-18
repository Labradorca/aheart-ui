import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { createHash } from 'node:crypto'
import { cp, lstat, mkdir, mkdtemp, readFile, realpath, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { tmpdir } from 'node:os'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { promisify } from 'node:util'
import { gzipSync } from 'node:zlib'
import { packageContracts } from './release-contract.mjs'
import { componentStyleClosure, entryClosure } from '../packages/build/split-styles.mjs'
import { cssUnionErrors, moduleBoundaryErrors, cssBudgetErrors, jsBudgetErrors } from './v1-entry-contract.mjs'
import { auditPublicCss, frozenCompositeReviewErrors } from './v1-css-integrity.mjs'

const root = fileURLToPath(new URL('..', import.meta.url)), run = promisify(execFile)
const arg = name => { const index = process.argv.indexOf(name); return index < 0 ? undefined : process.argv[index + 1] }
const output = path.resolve(arg('--out') ?? 'test-results/v1-consumer')
const packDir = path.resolve(arg('--pack-dir') ?? 'test-results/release-tarballs')
const stylesOnly = process.argv.includes('--styles-only'), initialize = process.argv.includes('--init-baselines')
const baselineFile = path.join(root, 'evidence/V1/css-baselines.json')
if (initialize && existsSync(baselineFile)) throw new Error('CSS baseline already exists; refusing to reset or enlarge it')
const json = async file => JSON.parse(await readFile(file, 'utf8'))
const sha = value => createHash('sha256').update(value).digest('hex')
const packages = { base: 'aheart-ui', ai: '@aheart-ui/ai', dnd: '@aheart-ui/dnd' }
const manifest = await json(path.join(root, 'packages/components/src/constant/entries.json'))
const approved = await json(path.join(root, 'evidence/V1/classification/approved.json'))
const entries = Object.entries(packages).flatMap(([domain, packageName]) => manifest[domain].map(entry => ({ domain, packageName, entry, key: `${domain}/${entry.subpath}` })))
assert.equal(new Set(entries.map(item => item.key)).size, entries.length, 'duplicate logical public entry')
assert.deepEqual(entries.map(item => item.key).sort(), approved.entries.map(entry => `${entry.domain}/${entry.subpath}`).sort(), 'existing approved public entry coverage changed')
const baselines = initialize ? { status: 'initial complete public CSS measurements; not full V1 acceptance', ownerDecision: 'owner-classification-confirmation-2026-11-17.md', entries: {} } : await json(baselineFile)
if (!initialize) assert.deepEqual(frozenCompositeReviewErrors(manifest, baselines), [], 'composite baseline freeze lacks independent integrity evidence')
const integrityReview = { schema: 'aheart-css-integrity.v1', reviewedAt: new Date().toISOString(), method: 'independent source AST traversal; no splitter imports', entries: {} }
const consumer = await realpath(await mkdtemp(path.join(tmpdir(), 'aheart-v1-consumer-')))
const resolveConsumer = createRequire(path.join(consumer, 'package.json')).resolve
await mkdir(output, { recursive: true })
const save = (name, value) => writeFile(path.join(output, name), JSON.stringify(value, null, 2) + '\n')
const result = { status: 'failed', scope: stylesOnly ? 'complete public styles and initial gate selection only' : 'all 65 public entries: isolated real-tarball JS/CSS/identity/SSR gates', consumer, node: process.version, tarballs: [], installed: [], styles: {}, builds: {}, commands: [] }
result.integrityReview = integrityReview
const capture = async (name, command, args) => {
  const startedAt = new Date().toISOString()
  try {
    const done = await run(command, args, { cwd: consumer, timeout: 180000, maxBuffer: 64 * 1024 * 1024 })
    const text = `${done.stdout}${done.stderr}`.trimEnd()
    await writeFile(path.join(output, `${name}.log`), text ? `${text}\n` : '')
    result.commands.push({ command: [command, ...args], exitCode: 0, startedAt, finishedAt: new Date().toISOString(), output: `${name}.log` })
  } catch (error) {
    await writeFile(path.join(output, `${name}.log`), `${error.stdout ?? ''}${error.stderr ?? error.message}`.trimEnd() + '\n')
    result.commands.push({ command: [command, ...args], exitCode: error.code ?? 1, startedAt, finishedAt: new Date().toISOString(), output: `${name}.log` })
    throw error
  }
}
const canonical = (domain, entry) => entry.sourceEntry ? entry : manifest[domain].find(candidate => `${candidate.subpath}/index` === entry.output)
const stylePath = (domain, entry) => resolveConsumer(`${packages[domain]}/${entry.subpath}/style.css`)
const classNames = css => [...new Set(css.match(/\.aheart-[\w-]+/g) ?? [])].sort()
try {
  const dependencies = { vue: '3.5.44', vite: '5.0.12' }
  for (const contract of packageContracts) {
    const filename = `${contract.name.replace(/^@/, '').replaceAll('/', '-')}-${contract.version}.tgz`
    const file = path.join(packDir, filename)
    result.tarballs.push({ name: contract.name, version: contract.version, sha256: sha(await readFile(file)) })
    await cp(file, path.join(consumer, filename))
    dependencies[contract.name] = `file:./${filename}`
  }
  await writeFile(path.join(consumer, 'package.json'), JSON.stringify({ name: 'aheart-v1-consumer', private: true, type: 'module', dependencies }, null, 2))
  await capture('install', 'npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund'])
  await cp(path.join(consumer, 'package-lock.json'), path.join(output, 'package-lock.json'))
  for (const contract of packageContracts) {
    const directory = path.join(consumer, 'node_modules', contract.name)
    assert.equal((await lstat(directory)).isSymbolicLink(), false)
    assert.equal(await realpath(directory), directory)
    const pkg = await json(path.join(directory, 'package.json'))
    assert.equal(pkg.version, contract.version)
    result.installed.push({ name: pkg.name, version: pkg.version, symlink: false, corePeer: pkg.peerDependencies?.['aheart-ui'] })
  }
  result.tools = { vite: (await json(path.join(consumer, 'node_modules/vite/package.json'))).version, vue: (await json(path.join(consumer, 'node_modules/vue/package.json'))).version, minify: true, sourceAlias: false, workspaceSymlink: false }
  assert.equal(result.tools.vite, '5.0.12')
  assert.equal(result.tools.vue, '3.5.44')
  assert.equal(result.installed.find(pkg => pkg.name === '@aheart-ui/ai').corePeer, '^1.4.0')
  const full = await readFile(resolveConsumer('aheart-ui/full.css'))
  const theme = await readFile(resolveConsumer('aheart-ui/theme.css'))
  const frozen = (await run('git', ['show', 'b1eef9b6:packages/components/es/full.css'], { cwd: root, encoding: 'buffer' })).stdout
  assert.equal(sha(full), sha(frozen), 'M1 full.css denominator changed')
  assert.deepEqual(full, await readFile(resolveConsumer('aheart-ui/style.css')))
  result.denominator = { fullBytes: full.length, fullSha256: sha(full), matchesV0: true, themeBytes: theme.length, themeFraction: theme.length / full.length }
  assert.ok(theme.length <= full.length * 0.05)
  if (initialize) Object.assign(baselines, { measuredAt: new Date().toISOString(), denominator: result.denominator, tarballs: result.tarballs })

  for (const { domain, entry, key } of entries) {
    const css = await readFile(stylePath(domain, entry)), source = componentStyleClosure(domain, entry.subpath)
    const integrity = auditPublicCss({ manifest, domain, subpath: entry.subpath, css })
    integrityReview.entries[key] = integrity
    assert.equal(integrity.pass, true, `${key}: independent source integrity audit failed: ${JSON.stringify({ missing: integrity.missing, extra: integrity.extra, orderPass: integrity.orderPass })}`)
    const errors = cssUnionErrors(css.toString(), source)
    assert.deepEqual(errors, [], `${key}: public style differs from own + declared dependency union`)
    const legacyStyle = entry.styleOutput ?? `${entry.subpath}/style.css`
    assert.deepEqual(css, await readFile(resolveConsumer(`${packages[domain]}/lib/${legacyStyle}`)), `${key}: legacy CSS differs`)
    const dependencies = []
    for (const dependency of canonical(domain, entry).dependencies ?? []) {
      const [targetDomain, subpath] = dependency.includes('/') ? dependency.split('/') : [domain, dependency]
      const target = manifest[targetDomain].find(candidate => candidate.subpath === subpath)
      const bytes = (await readFile(stylePath(targetDomain, target))).length
      dependencies.push({ entry: `${targetDomain}/${subpath}`, bytes, fraction: bytes / css.length, accounting: 'inclusive public dependency bytes; overlaps are reported, not added as disjoint shares' })
    }
    const leafPass = css.length <= full.length * 0.25 && css.length + theme.length <= full.length * 0.30
    const owner = approved.entries.find(candidate => candidate.domain === domain && candidate.subpath === entry.subpath)
    assert.equal(entry.budgetClass, owner.classification, `${key}: classification drift`)
    const lockedLeaf = owner.classification === 'leaf' || owner.cssGateSelection.startsWith('leaf_hard')
    if (initialize) {
      assert.ok(!lockedLeaf || leafPass, `${key}: locked leaf line exceeded; stop without exception`)
      baselines.entries[key] = { gate: lockedLeaf || leafPass ? 'leaf' : 'union-ratchet', firstLeafPass: leafPass, bytes: css.length, fractionOfFull: css.length / full.length, themePlusBytes: css.length + theme.length, themePlusFraction: (css.length + theme.length) / full.length, sha256: sha(css), dependencies }
    }
    const baseline = baselines.entries[key]
    assert.ok(baseline, `${key}: baseline missing`)
    assert.ok(!lockedLeaf || baseline.gate === 'leaf', `${key}: existing leaf-hard gate cannot be lowered`)
    const effective = initialize ? { ...entry, cssGate: baseline.gate } : entry
    assert.equal(effective.cssGate, baseline.gate, `${key}: manifest gate differs from frozen measured selection`)
    const checked = cssBudgetErrors({ entry: effective, bytes: css.length, themeBytes: theme.length, fullBytes: full.length, baseline, dependencies })
    assert.deepEqual(checked.errors, [], `${key}: CSS gate failed`)
    result.styles[key] = { gate: baseline.gate, bytes: css.length, fractionOfFull: css.length / full.length, themePlusBytes: css.length + theme.length, themePlusFraction: (css.length + theme.length) / full.length, firstLeafPass: baseline.firstLeafPass, dependencies, unionPass: true, cssClassCount: classNames(css.toString()).length }
  }
  if (initialize) {
    baselines.status = 'initial composite baselines frozen only after independent integrity review; not full V1 acceptance'
    baselines.integrityReview = { ...integrityReview, entries: Object.fromEntries(Object.entries(integrityReview.entries).filter(([key]) => { const [domain, subpath] = key.split('/'); return manifest[domain].find(entry => entry.subpath === subpath).budgetClass === 'composite' })) }
    assert.deepEqual(frozenCompositeReviewErrors(manifest, baselines), [])
    await writeFile(baselineFile, JSON.stringify(baselines, null, 2) + '\n')
  }
  if (!stylesOnly) {
    await writeFile(path.join(consumer, 'entry-manifest.json'), JSON.stringify(entries))
    await writeFile(path.join(consumer, 'probe.mjs'), `
import assert from 'node:assert/strict'
import {readFile,writeFile} from 'node:fs/promises'
import {createRequire} from 'node:module'
import {createSSRApp,h} from 'vue'
import {renderToString} from 'vue/server-renderer'
const require=createRequire(import.meta.url), entries=JSON.parse(await readFile('entry-manifest.json','utf8')), names={}
for(const {entry,packageName,key,domain} of entries){
 const request=packageName+'/'+entry.subpath, esm=await import(request), cjs=require(request), root=await import(packageName), rootCjs=require(packageName)
 const output=entry.output??entry.subpath+'/index', legacy=await import(packageName+'/es/'+output+'.js'), legacyCjs=require(packageName+'/lib/'+output+'.js')
 for(const name of Object.keys(esm)){
  assert.equal(esm[name],legacy[name],request+' legacy ESM '+name);assert.equal(cjs[name],legacyCjs[name],request+' legacy CJS '+name)
  if(name!=='default' && name in root){assert.equal(esm[name],root[name],request+' root ESM '+name);assert.equal(cjs[name],rootCjs[name],request+' root CJS '+name)}
 }
 // Legacy-only aliases (e.g. grid.ACol) were never root exports. Canonical
 // Resolver names must all retain their existing root/component identities.
 for(const name of entry.names??[]){assert.ok(root[name],request+' root '+name);assert.equal(esm[name],root[name]);assert.equal(cjs[name],rootCjs[name])}
 if(domain==='base'){
  assert.equal(Object.hasOwn(root,'default'),false);assert.equal(Object.hasOwn(rootCjs,'default'),false)
  assert.equal((await import(packageName+'/full')).default,(await import(packageName+'/es/index.js')).default)
  assert.equal(require(packageName+'/full').default,require(packageName+'/lib/index.js').default)
 }else{
  assert.equal((await import(packageName+'/full')).default,root.default);assert.equal(require(packageName+'/full').default,rootCjs.default)
 }
 const all=Object.keys(esm).filter(name=>name!=='default'), preferred=entry.names?.length?entry.names:all
 names[key]=preferred
 const renderName=entry.name&&preferred.includes(entry.name)?entry.name:({chat:'AIChatPanel',agent:'AIForm',workbench:'AIAgentWorkbench'}[entry.subpath]??preferred[0])
 const props=renderName==='AIForm'?{schema:{version:'1',fields:[]}}:renderName==='Combobox'?{options:[]}:renderName==='SortableList'?{items:[],itemKey:'id'}:renderName==='Draggable'?{data:{type:'v1',id:'item'}}:renderName==='AIBubble'?{message:{id:'v1',role:'assistant',content:'SSR acceptance'}}:renderName==='AIChatPanel'?{transport:{async *send(){}}}:{}
 assert.equal(typeof await renderToString(createSSRApp({render:()=>h(esm[renderName],props)})),'string',request+' SSR')
}
assert.equal(typeof window,'undefined')
const {default:AIForm,AI_FORM_FIELD_TYPES}=await import('@aheart-ui/ai/form')
assert.deepEqual([...AI_FORM_FIELD_TYPES],['input','textarea','number','select','checkbox','radio','switch','date','date-range','time','time-range','upload','tree-select'])
assert.deepEqual(Object.keys(AIForm.props).sort(),['modelValue','schema','disabled','submitting','submitText','submitError','validators'].sort())
assert.deepEqual([...AIForm.emits].sort(),['update:modelValue','submit','schema-error','validation-error'].sort())
const fields=AI_FORM_FIELD_TYPES.map((type,index)=>({key:'field'+index,label:type,type,...(['select','checkbox','radio','tree-select'].includes(type)?{options:[{label:'A',value:'a'}]}:{})}))
const formHTML=await renderToString(createSSRApp({render:()=>h(AIForm,{schema:{version:'1',fields}})}))
assert.ok(!formHTML.includes('表单配置无效'))
assert.equal(formHTML.split('data-field-key=').length-1,13)
await writeFile('entry-names.json',JSON.stringify(names))
console.log('All 65 ESM/CJS/root/full identities and representative SSR, plus AIForm 13-field SSR and unchanged props/events passed')
`)
    await capture('identity-ssr', process.execPath, ['probe.mjs'])
    const names = await json(path.join(consumer, 'entry-names.json'))
    await writeFile(path.join(consumer, 'index.html'), '<!doctype html><html><body><div id="app"></div><script type="module" src="/main.js"></script></body></html>')
    const { build } = await import(pathToFileURL(path.join(consumer, 'node_modules/vite/dist/node/index.js')).href)
    const graph = { format: 'moduleIds dictionary; parsed and rendered indices retain all real module IDs and renderedLength', moduleIds: [], builds: {} }, indices = new Map()
    const intern = id => { if (!indices.has(id)) { indices.set(id, graph.moduleIds.length); graph.moduleIds.push(id) } return indices.get(id) }
    const bundle = async (name, code) => {
      await writeFile(path.join(consumer, 'main.js'), code)
      const parsed = new Set(), rendered = []
      const bundles = await build({ root: consumer, configFile: false, logLevel: 'error', build: { minify: true, write: false }, plugins: [{ name: 'v1-evidence', moduleParsed(info) { parsed.add(info.id.replaceAll(consumer, '<consumer>')) }, generateBundle(_options, output) { for (const chunk of Object.values(output)) if (chunk.type === 'chunk') for (const [id, info] of Object.entries(chunk.modules)) rendered.push({ id: id.replaceAll(consumer, '<consumer>'), renderedLength: info.renderedLength }) } }] })
      const assets = (Array.isArray(bundles) ? bundles : [bundles]).flatMap(bundle => bundle.output).map(asset => { const contents = asset.type === 'chunk' ? asset.code : asset.source; return { file: asset.fileName, bytes: Buffer.byteLength(contents), gzipBytes: gzipSync(contents).length, ...(asset.type === 'asset' && asset.fileName.endsWith('.css') ? { css: contents.toString() } : {}) } })
      const ids = [...parsed].sort(), modules = rendered.sort((a, b) => a.id.localeCompare(b.id))
      graph.builds[name] = { parsed: ids.map(intern), rendered: modules.map(item => [intern(item.id), item.renderedLength]), assets: assets.map(({ css, ...asset }) => asset) }
      const summary = { jsGzip: assets.filter(asset => asset.file.endsWith('.js')).reduce((sum, asset) => sum + asset.gzipBytes, 0), cssBytes: assets.filter(asset => asset.file.endsWith('.css')).reduce((sum, asset) => sum + asset.bytes, 0), parsedModules: ids.length }
      result.builds[name] = summary
      return { ...summary, ids, modules, css: assets.map(asset => asset.css ?? '').join('\n') }
    }
    const header = "import {createApp,h,resolveComponent} from 'vue';"
    const fullBuilds = {}
    result.status = 'running'
    for (const [domain, packageName] of Object.entries(packages)) {
      fullBuilds[domain] = await bundle(`${domain}/full`, `${header}import Plugin from '${packageName}/full';const app=createApp({render:()=>h(resolveComponent('${domain === 'base' ? 'AButton' : domain === 'ai' ? 'AAIChatPanel' : 'ASortableList'}'))});app.use(Plugin);app.mount('#app')`)
      assert.equal(fullBuilds[domain].cssBytes, 0, `${domain}: full Plugin introduced implicit CSS`)
    }
    try {
      for (const { domain, packageName, entry, key } of entries) {
        const imported = names[key], request = `${packageName}/${entry.subpath}`
        const fixture = source => `${header}import {${imported.join(',')}} from '${source}';const components=[${imported.join(',')}];console.log(components);createApp({render:()=>h(components[0])}).mount('#app')`
        const selected = await bundle(`${key}/scoped`, fixture(request))
        const named = await bundle(`${key}/root-named`, fixture(packageName))
        assert.equal(selected.cssBytes, 0, `${key}: runtime JS introduced CSS`)
        assert.equal(named.cssBytes, 0, `${key}: root named runtime introduced CSS`)
        assert.deepEqual(moduleBoundaryErrors(selected.ids, entryClosure(domain, entry.subpath)), [], `${key}: module graph crossed declared dependencies`)
        const moduleDirectory = packageContracts.find(pkg => pkg.name === packageName).dist ? 'dist/esm' : 'es'
        const pluginFile = `/node_modules/${packageName}/${moduleDirectory}/${domain === 'base' ? 'plugin.js' : 'index.js'}`
        assert.ok(!named.modules.some(module => module.id.endsWith(pluginFile) && module.renderedLength > 0), `${key}: root named retained full Plugin`)
        assert.deepEqual(jsBudgetErrors(selected.jsGzip, named.jsGzip, fullBuilds[domain].jsGzip), [], `${key}: unchanged JS budget failed`)
        const styles = ['aheart-ui/theme.css', `${request}/style.css`, ...(entry.sideEffects ?? [])]
        const styled = await bundle(`${key}/styles`, fixture(request) + styles.map(style => `\nimport '${style}'`).join(''))
        assert.ok(styled.cssBytes > 0, `${key}: CSS was pruned`)
        const expected = [theme.toString(), await readFile(stylePath(domain, entry), 'utf8')]
        for (const sideEffect of entry.sideEffects ?? []) {
          const targetDomain = Object.keys(packages).find(domain => sideEffect.startsWith(packages[domain] + '/'))
          const subpath = sideEffect.slice(packages[targetDomain].length + 1).replace('/style.css', '')
          expected.push(await readFile(stylePath(targetDomain, manifest[targetDomain].find(entry => entry.subpath === subpath)), 'utf8'))
        }
        assert.deepEqual(classNames(styled.css), classNames(expected.join('\n')), `${key}: declared CSS class coverage changed in production`)
        console.log(`${key}: module graph / JS / CSS passed`)
        await save('results.json', result)
      }
      for (const helper of ['constant', 'resolver']) {
        const isolated = await bundle(`base/${helper}`, `import * as helper from 'aheart-ui/${helper}';console.log(helper)`)
        assert.equal(isolated.cssBytes, 0)
        assert.ok(!isolated.ids.some(id => /\/node_modules\/(?:@vue\/|vue\/|@aheart-ui\/)|\.vue\.js/.test(id)), `${helper}: non-UI entry loaded component runtime`)
      }
    } finally { await save('module-graphs.json', graph) }
  }
  result.coverage = { total: entries.length, styles: Object.keys(result.styles).length, js: stylesOnly ? 0 : entries.filter(({ key }) => result.builds[`${key}/styles`]).length }
  result.status = 'passed'
} catch (error) { result.status = 'failed'; result.error = error.stack ?? String(error); process.exitCode = 1 }
await save('results.json', result)
await writeFile(path.join(output, 'exit-code'), result.status === 'passed' ? '0\n' : '1\n')
console.log(JSON.stringify({ status: result.status, coverage: result.coverage, error: result.error }, null, 2))
