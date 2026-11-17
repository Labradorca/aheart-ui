// A focused stop-point reproduction: inspect real tarballs and preserve the
// smallest complete static stylesheet closure of the unchanged AIForm fields.
import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { createHash } from 'node:crypto'
import { cp, mkdir, mkdtemp, readFile, realpath, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { promisify } from 'node:util'
import ts from 'typescript'
import { fullStyleSources } from '../../packages/components/build/entries.mjs'

const root=fileURLToPath(new URL('../..',import.meta.url)),run=promisify(execFile)
const out=path.join(root,'evidence/V1/aiform-budget')
await mkdir(out,{recursive:true})
const hash=value=>createHash('sha256').update(value).digest('hex')
const manifest=JSON.parse(await readFile(path.join(root,'packages/components/src/constant/entries.json'),'utf8'))
const consumer=await realpath(await mkdtemp(path.join(tmpdir(),'aheart-v1-aiform-')))
const result={status:'failed',baseline:'b1eef9b6f5e1b64706beee5d4d56e08891f27c26',consumer,command:['node','evidence/V1/aiform-budget-probe.mjs'],node:process.version,tarballs:[],fields:[],styles:[],graph:{}}
const capture=async(name,command,args,options={})=>{
  try{
    const r=await run(command,args,{cwd:consumer,maxBuffer:32*1024*1024,timeout:180000,...options})
    await writeFile(path.join(out,`${name}.txt`),(r.stdout+r.stderr).split('\n').map(line=>line.trimEnd()).join('\n'))
    return r
  }catch(error){
    await writeFile(path.join(out,`${name}.txt`),`${error.stdout??''}${error.stderr??error.message}`.split('\n').map(line=>line.trimEnd()).join('\n'))
    throw error
  }
}
try{
  const dependencies={vue:'3.5.44',vite:'5.0.12'}
  for(const dir of ['components','ai','dnd']){
    const pkg=JSON.parse(await readFile(path.join(root,`packages/${dir}/package.json`),'utf8'))
    const filename=`${pkg.name.replace(/^@/,'').replaceAll('/','-')}-${pkg.version}.tgz`
    const tarball=path.join(root,'test-results/release-tarballs',filename)
    result.tarballs.push({name:pkg.name,version:pkg.version,sha256:hash(await readFile(tarball))})
    await cp(tarball,path.join(consumer,filename))
    dependencies[pkg.name]=`file:./${filename}`
  }
  await writeFile(path.join(consumer,'package.json'),JSON.stringify({name:'aheart-v1-aiform-budget',private:true,type:'module',dependencies},null,2))
  await capture('install','npm',['install','--ignore-scripts','--no-audit','--no-fund'])
  await cp(path.join(consumer,'package-lock.json'),path.join(out,'package-lock.json'))
  const core=path.join(consumer,'node_modules/aheart-ui')
  const full=await readFile(path.join(core,'es/full.css')),theme=await readFile(path.join(core,'es/theme.css'))
  const baselineFull=(await run('git',['show','b1eef9b6f5e1b64706beee5d4d56e08891f27c26:packages/components/es/full.css'],{cwd:root,encoding:'buffer',maxBuffer:1024*1024})).stdout
  assert.equal(hash(full),hash(baselineFull),'The M1 full stylesheet denominator must not be inflated')
  const imports=[]
  for(const sourcePath of ['packages/ai/src/form.vue','packages/ai/src/form-field.vue']){
    const source=await readFile(path.join(root,sourcePath),'utf8')
    const script=[...source.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(match=>match[1]).join('\n')
    const file=ts.createSourceFile(sourcePath,script,ts.ScriptTarget.Latest,true)
    for(const statement of file.statements){
      if(!ts.isImportDeclaration(statement)||statement.moduleSpecifier.text!=='aheart-ui'||statement.importClause?.isTypeOnly)continue
      const bindings=statement.importClause?.namedBindings
      if(!bindings||!ts.isNamedImports(bindings))continue
      for(const binding of bindings.elements){
        if(binding.isTypeOnly)continue
        const name=(binding.propertyName??binding.name).text
        const entry=manifest.base.find(entry=>(entry.names??[entry.name]).includes(name))
        assert.ok(entry,`${name}: missing public component entry`)
        imports.push({source:sourcePath,name,subpath:entry.subpath})
      }
    }
  }
  result.fields=imports
  const families=[...new Set(imports.map(item=>item.subpath))]
  const entries=families.map(key=>manifest.base.find(entry=>entry.subpath===key))
  const sources=new Set(entries.flatMap(entry=>entry.styles))
  const fragments=[]
  for(const source of fullStyleSources.filter(source=>sources.has(source))){
    const contents=(await readFile(path.join(root,'packages/components/src',source),'utf8')).trimEnd()
    const carrier=entries.find(entry=>entry.styles.includes(source))
    const packed=await readFile(path.join(core,`es/${carrier.subpath}/style.css`),'utf8')
    assert.ok(packed.includes(contents),`${source}: source fragment missing from actual packed ${carrier.subpath} stylesheet`)
    fragments.push(contents)
    result.styles.push({source,bytes:Buffer.byteLength(contents),sha256:hash(contents),packedCarrier:`aheart-ui/${carrier.subpath}/style.css`})
  }
  const aiStyle=await readFile(path.join(consumer,'node_modules/@aheart-ui/ai/es/form/style.css'),'utf8')
  const closure=`${fragments.join('\n')}\n${aiStyle}`
  await writeFile(path.join(out,'complete-required-styles.css'),closure)
  const bytes=Buffer.byteLength(closure)
  result.css={denominator:'aheart-ui/full.css, the same common baseline used by evidence/M1/contract.md',fullBytes:full.length,fullSha256:hash(full),fullMatchesV0:true,themeBytes:theme.length,aiOwnBytes:Buffer.byteLength(aiStyle),completeClosureBytes:bytes,fractionOfFull:bytes/full.length,componentLimit:full.length*.25,themeAndComponentLimit:full.length*.30,componentPass:bytes<=full.length*.25,themeAndComponentPass:bytes+theme.length<=full.length*.30,note:'Optimistic complete closure deduplicates identical base stylesheet sources; comparing only AIForm own CSS would omit required base controls. No package output was changed by this probe.'}
  await writeFile(path.join(consumer,'index.html'),'<!doctype html><html><body><div id="app"></div><script type="module" src="/main.js"></script></body></html>')
  await writeFile(path.join(consumer,'main.js'),"import {createApp,h} from 'vue';import {AIForm} from '@aheart-ui/ai/form';createApp({render:()=>h(AIForm,{schema:{version:'1',fields:[]}})}).mount('#app')")
  const {build}=await import(pathToFileURL(path.join(consumer,'node_modules/vite/dist/node/index.js')).href)
  const parsed=new Set()
  await build({root:consumer,configFile:false,logLevel:'error',build:{minify:true},plugins:[{name:'v1-aiform-graph',moduleParsed(info){parsed.add(info.id.replace(consumer,'<consumer>'))}}]})
  const ids=[...parsed].sort()
  await writeFile(path.join(out,'module-graph.json'),JSON.stringify({parsed:ids},null,2)+'\n')
  const permitted=new Set(entries.flatMap(entry=>[entry.subpath,...entry.dependencies]))
  result.graph={parsedCount:ids.length,permittedBaseFamilies:[...permitted].sort(),rootBarrelParsed:ids.includes('<consumer>/node_modules/aheart-ui/es/index.js'),unrelatedBaseModules:ids.filter(id=>{
    const match=/\/node_modules\/aheart-ui\/es\/([^/]+)\/(.+)/.exec(id)
    return match&&!permitted.has(match[1])&&!['utils','config','picker-core'].includes(match[1])&&!(match[1]==='form'&&!match[2].includes('.vue'))
  })}
  if(!result.css.componentPass||!result.css.themeAndComponentPass)result.error='V1 stop point: AIForm complete static stylesheet closure exceeds the unchanged M1 CSS budgets.'
  else if(result.graph.unrelatedBaseModules.length)result.error='V1 stop point: AIForm parses the base root barrel and unrelated component modules.'
  else result.status='passed'
}catch(error){result.error=error.stack??String(error)}
await writeFile(path.join(out,'results.json'),JSON.stringify(result,null,2)+'\n')
await writeFile(path.join(out,'exit-code'),result.status==='passed'?'0\n':'1\n')
console.log(JSON.stringify(result,null,2))
if(result.status!=='passed')process.exitCode=1
