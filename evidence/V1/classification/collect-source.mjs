// Read-only evidence collection for the owner's classification review.
// This does not change the production manifest or implement a budget gate.
import { readFileSync, existsSync, statSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import ts from 'typescript'

const root=process.cwd(),manifest=JSON.parse(readFileSync('packages/components/src/constant/entries.json','utf8'))
const coreNames=new Map(manifest.base.flatMap(entry=>(entry.names??[entry.name]).map(name=>[name,entry.subpath])))
const hash=value=>createHash('sha256').update(value).digest('hex')
const results=[]
for(const domain of ['ai','dnd'])for(const entry of manifest[domain]){
  const canonical=entry.sourceEntry?entry:manifest[domain].find(candidate=>`${candidate.subpath}/index`===entry.output)
  const sourceRoot=path.join(root,'packages',domain),seen=new Set(),imports=[],views=new Set(),core=new Set(),external=new Set()
  function resolve(file,specifier){
    const target=path.resolve(path.dirname(file),specifier)
    return [target,`${target}.ts`,`${target}.vue`,path.join(target,'index.ts')].find(candidate=>existsSync(candidate)&&statSync(candidate).isFile())
  }
  function visit(file){
    if(seen.has(file))return
    seen.add(file)
    const raw=readFileSync(file,'utf8')
    if(file.endsWith('.css')||file.endsWith('.json'))return
    if(file.endsWith('.vue'))views.add(path.basename(file,'.vue'))
    const code=file.endsWith('.vue')?[...raw.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(match=>match[1]).join('\n'):raw
    const tree=ts.createSourceFile(file,code,ts.ScriptTarget.Latest,true)
    for(const statement of tree.statements){
      if(!(ts.isImportDeclaration(statement)||ts.isExportDeclaration(statement))||!statement.moduleSpecifier||!ts.isStringLiteral(statement.moduleSpecifier))continue
      if(statement.isTypeOnly||statement.importClause?.isTypeOnly)continue
      const clause=statement.importClause
      const named=clause?.namedBindings&&ts.isNamedImports(clause.namedBindings)?clause.namedBindings.elements.filter(binding=>!binding.isTypeOnly).map(binding=>(binding.propertyName??binding.name).text):[]
      if(clause&&!clause.name&&clause.namedBindings&&ts.isNamedImports(clause.namedBindings)&&!named.length)continue
      const specifier=statement.moduleSpecifier.text
      const sourceLine=raw.split('\n').findIndex(line=>line.includes(specifier))+1
      imports.push({file:path.relative(root,file).replaceAll(path.sep,'/'),sourceLine,specifier,names:named})
      if(specifier==='aheart-ui')for(const name of named){if(coreNames.has(name))core.add(coreNames.get(name))}
      else if(specifier.startsWith('aheart-ui/'))core.add(specifier.slice('aheart-ui/'.length).split('/')[0])
      if(specifier.startsWith('.')){
        const target=resolve(file,specifier)
        if(target&&target.startsWith(`${sourceRoot}${path.sep}`))visit(target)
      }else external.add(specifier)
    }
  }
  visit(path.join(sourceRoot,canonical.sourceEntry))
  const expanded=new Set(core)
  for(const key of core)for(const dependency of manifest.base.find(candidate=>candidate.subpath===key)?.dependencies??[])expanded.add(dependency)
  results.push({domain,subpath:entry.subpath,canonicalSubpath:canonical.subpath,componentViews:[...views].sort(),directBaseFamilies:[...core].sort(),baseFamiliesWithDeclaredTransitives:[...expanded].sort(),externalImports:[...external].sort(),imports,sourceSha256:Object.fromEntries([...seen].sort().map(file=>[path.relative(root,file).replaceAll(path.sep,'/'),hash(readFileSync(file))]))})
}
const output={head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),scope:'source-only audit; classification remains an unapproved proposal',entries:results}
writeFileSync('evidence/V1/classification/source-evidence.json',JSON.stringify(output,null,2)+'\n')
console.log(JSON.stringify(results.map(({domain,subpath,componentViews,directBaseFamilies})=>({domain,subpath,componentViews,directBaseFamilies})),null,2))
