import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import ts from 'typescript'
import { loadConfigFromFile } from 'vite'

const root=fileURLToPath(new URL('..',import.meta.url))
export const domainPackages={base:'aheart-ui',ai:'@aheart-ui/ai',dnd:'@aheart-ui/dnd'}
const packageDirs={base:'components',ai:'ai',dnd:'dnd'}
const componentNames=entry=>entry.names?.length?entry.names:entry.name?[entry.name]:[]
const runtimeTarget=output=>({types:`./es/${output}.d.ts`,import:`./es/${output}.js`,require:`./lib/${output}.js`})
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b)

export async function loadEntrySnapshot(){
  const manifest=JSON.parse(readFileSync(path.join(root,'packages/components/src/constant/entries.json'),'utf8'))
  const packages=Object.fromEntries(Object.entries(packageDirs).map(([domain,dir])=>[domain,JSON.parse(readFileSync(path.join(root,`packages/${dir}/package.json`),'utf8'))]))
  const code=ts.transpileModule(readFileSync(path.join(root,'docs/.vitepress/data/components.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText
  const metadata=await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`)
  const catalog=metadata.getComponentCategories('zh').flatMap(category=>category.components).filter(component=>component.status==='Ready')
  const configuration=await loadConfigFromFile({command:'build',mode:'production'},path.join(root,'docs/.vitepress/config.ts'))
  const links=new Set()
  const collect=value=>{
    if(!value||typeof value!=='object')return
    if(typeof value.link==='string')links.add(value.link)
    Object.values(value).forEach(collect)
  }
  collect(configuration.config.locales.root.themeConfig.sidebar)
  const {qualityMatrix}=await import('../docs/.vitepress/data/quality-matrix.mjs')
  const {AheartUIResolver}=await import('../packages/components/es/resolver/index.js')
  const {aheartComponentEntries}=await import('../packages/components/es/constant/index.js')
  return {root,manifest,packages,catalog,navigationLinks:[...links],qualityMatrix,componentEntries:aheartComponentEntries,resolver:AheartUIResolver}
}

export function validateEntrySnapshot(snapshot){
  const {manifest,packages,catalog,navigationLinks,qualityMatrix,componentEntries,resolver}=snapshot
  const errors=[],covered=new Set(),globals=new Set(),expectedConstant=[]
  const ready=new Map(catalog.map(component=>[component.key,component]))
  const matrix=new Map(qualityMatrix.map(record=>[record.component,record]))
  const validExtras=new Set(['.','./full','./constant','./resolver','./theme.css','./full.css','./style.css','./package.json','./es/*','./lib/*','./es/picker-core/*','./lib/picker-core/*'])
  for(const [domain,packageName] of Object.entries(domainPackages)){
    const entries=manifest[domain],paths=new Set(),expectedExports=new Set()
    const cssResolver=resolver({domains:[domain],importStyle:'css'}),plainResolver=resolver({domains:[domain]})
    if(!entries?.length){errors.push(`${domain}: empty entry manifest`);continue}
    for(const entry of entries){
      const request=`${packageName}/${entry.subpath}`
      if(paths.has(entry.subpath))errors.push(`${request}: duplicate subpath`)
      paths.add(entry.subpath)
      const output=entry.output??`${entry.subpath}/index`
      const styleOutput=entry.styleOutput??`${entry.subpath}/style.css`
      const runtimeKey=`./${entry.subpath}`,styleKey=`${runtimeKey}/style.css`
      expectedExports.add(runtimeKey);expectedExports.add(styleKey)
      if(!same(packages[domain].exports[runtimeKey],runtimeTarget(output)))errors.push(`${request}: runtime exports drift`)
      if(packages[domain].exports[styleKey]!==`./es/${styleOutput}`)errors.push(`${request}: stylesheet export drift`)
      if(entry.sourceEntry&&!existsSync(path.join(snapshot.root,`packages/${packageDirs[domain]}`,entry.sourceEntry)))errors.push(`${request}: source entry missing`)
      if(domain==='base'){
        if(!entry.styles?.length)errors.push(`${request}: component stylesheet sources missing`)
        for(const source of entry.styles??[]){
          if(!existsSync(path.join(snapshot.root,'packages/components/src',source)))errors.push(`${request}: missing stylesheet source ${source}`)
        }
      }
      const catalogKeys=entry.catalogKeys??(domain==='base'?[entry.subpath]:[])
      for(const key of catalogKeys){
        covered.add(key)
        if(!ready.has(key))errors.push(`${request}: ${key} is not a Ready catalogue entry`)
        if(matrix.get(key)?.package!==packageName)errors.push(`${request}: ${key} quality matrix package drift`)
      }
      const names=componentNames(entry)
      if(domain==='base'&&!names.length)errors.push(`${request}: no Resolver component names`)
      for(const name of names){
        const globalName=`A${name}`,styles=[`${request}/style.css`,...(entry.sideEffects??[])]
        if(globals.has(globalName))errors.push(`${globalName}: duplicate Resolver name`)
        globals.add(globalName)
        expectedConstant.push({domain,name,from:request,styles})
        if(!same(cssResolver(globalName),{name,from:request,sideEffects:styles}))errors.push(`${request}: ${globalName} Resolver CSS drift`)
        if(!same(plainResolver(globalName),{name,from:request}))errors.push(`${request}: ${globalName} Resolver JS drift`)
        if(domain==='base'&&!same(resolver()(globalName),{name,from:request}))errors.push(`${request}: default Resolver misses ${globalName}`)
      }
    }
    for(const key of Object.keys(packages[domain].exports)){
      if(!validExtras.has(key)&&!expectedExports.has(key))errors.push(`${packageName}: public export ${key} is outside the manifest`)
    }
  }
  if(!same(componentEntries,expectedConstant))errors.push('published constant entries drift from the manifest')
  if(qualityMatrix.length!==ready.size)errors.push('quality matrix Ready count drift')
  for(const [key,component] of ready){
    if(!covered.has(key))errors.push(`${key}: Ready component is absent from the entry manifest`)
    if(!matrix.has(key))errors.push(`${key}: quality matrix coverage missing`)
    if(!component.link||!navigationLinks.includes(component.link))errors.push(`${key}: actual documentation sidebar coverage missing`)
    if(component.link&&!existsSync(path.join(snapshot.root,'docs',`${component.link.slice(1)}.md`)))errors.push(`${key}: documentation page missing`)
  }
  for(const key of matrix.keys())if(!ready.has(key))errors.push(`${key}: quality matrix entry is not Ready`)
  for(const unknown of ['AUnknown','AMotionFade','toString','constructor','__proto__']){
    if(resolver({domains:['base','ai','dnd']})(unknown)!==undefined)errors.push(`${unknown}: unexpected Resolver match`)
  }
  return {errors,coverage:{ready:ready.size,readyCovered:[...ready.keys()].filter(key=>covered.has(key)).length,entries:Object.fromEntries(Object.entries(domainPackages).map(([domain])=>[domain,manifest[domain].length])),resolverNames:globals.size,navigationReady:catalog.filter(component=>navigationLinks.includes(component.link)).length}}
}

if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
  const result=validateEntrySnapshot(await loadEntrySnapshot())
  const outIndex=process.argv.indexOf('--out')
  if(outIndex>=0)writeFileSync(process.argv[outIndex+1],JSON.stringify(result,null,2)+'\n')
  console.log(JSON.stringify(result,null,2))
  if(result.errors.length)process.exitCode=1
}
