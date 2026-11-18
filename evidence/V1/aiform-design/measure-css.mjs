// Design-only experiment. It never edits package source or generated outputs.
import { readFile, writeFile, mkdtemp, realpath, mkdir } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import path from 'node:path'
import { tmpdir } from 'node:os'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root=fileURLToPath(new URL('../../..',import.meta.url))
const directory=path.join(root,'evidence/V1/aiform-design')
await mkdir(directory,{recursive:true})
const probe=JSON.parse(await readFile(path.join(root,'evidence/V1/aiform-budget/results.json'),'utf8'))
const consumer=probe.consumer
const {build}=await import(pathToFileURL(path.join(consumer,'node_modules/vite/dist/node/index.js')).href)
const version=JSON.parse(await readFile(path.join(consumer,'node_modules/vite/package.json'),'utf8')).version
const temporary=await realpath(await mkdtemp(path.join(tmpdir(),'aheart-aiform-css-design-')))
const hash=value=>createHash('sha256').update(value).digest('hex')
const cases={
  full:await readFile(path.join(consumer,'node_modules/aheart-ui/es/full.css')),
  closure:await readFile(path.join(root,'evidence/V1/aiform-budget/complete-required-styles.css')),
  theme:await readFile(path.join(consumer,'node_modules/aheart-ui/es/theme.css')),
  aiOwn:await readFile(path.join(consumer,'node_modules/@aheart-ui/ai/es/form/style.css'))
}
const result={scope:'design-only CSS minification experiment; not a V1 acceptance run',command:['node','evidence/V1/aiform-design/measure-css.mjs'],viteVersion:version,configuration:{configFile:false,root:'isolated realpath temporary directory',build:{minify:true,write:false},mode:'production'},temporary,cases:{}}
await writeFile(path.join(temporary,'index.html'),'<!doctype html><html><body><script type="module" src="/main.js"></script></body></html>')
await writeFile(path.join(temporary,'main.js'),"import './input.css';console.log('AIForm CSS feasibility')")
for(const [name,input] of Object.entries(cases)){
  await writeFile(path.join(temporary,'input.css'),input)
  const output=await build({root:temporary,configFile:false,logLevel:'error',build:{minify:true,write:false}})
  const styles=output.output.filter(asset=>asset.type==='asset'&&asset.fileName.endsWith('.css'))
  const css=styles.map(asset=>asset.source.toString()).join('\n')
  result.cases[name]={rawBytes:input.length,rawSha256:hash(input),minifiedBytes:Buffer.byteLength(css),minifiedSha256:hash(css),assetCount:styles.length}
  await writeFile(path.join(directory,`${name}.min.css`),css)
}
const F=probe.css.fullBytes,C=probe.css.completeClosureBytes,A=probe.css.aiOwnBytes
result.minifiedBudget={fullBytes:result.cases.full.minifiedBytes,componentBytes:result.cases.closure.minifiedBytes,themeBytes:result.cases.theme.minifiedBytes,fraction:result.cases.closure.minifiedBytes/result.cases.full.minifiedBytes,componentPass:result.cases.closure.minifiedBytes<=result.cases.full.minifiedBytes*.25,themeAndComponentPass:result.cases.closure.minifiedBytes+result.cases.theme.minifiedBytes<=result.cases.full.minifiedBytes*.30}
result.requiredReduction={fixedFullBaseline:C-F*.25,sharedBaseOnly:(C-F*.25)/.75,sharedBaseOnlyIntegerMinimum:Math.ceil((C-F*.25)/.75),baseClosureBytes:C-A,fractionOfBaseClosure:((C-F*.25)/.75)/(C-A),assumption:'A byte removed from shared base styles reduces both the AIForm closure and full.css by one byte; AI own styles remain unchanged. Ratios are always recomputed against the same-format candidate full.css.'}
result.conclusion='Conventional minification is insufficient when both numerator and denominator use identical build settings. Entry/file splitting alone does not reduce the complete CSS dependency closure.'
await writeFile(path.join(directory,'css-measurement.json'),JSON.stringify(result,null,2)+'\n')
await writeFile(path.join(directory,'measurement.exit-code'),'0\n')
console.log(JSON.stringify(result,null,2))
