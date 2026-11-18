import assert from 'node:assert/strict'
import {readFileSync, writeFileSync} from 'node:fs'
import {execFileSync} from 'node:child_process'
import {createHash} from 'node:crypto'
import path from 'node:path'
import postcss from 'postcss'
const root=process.cwd(), directory='evidence/V1/css-closure/selector-fix'
const read=file=>readFileSync(file,'utf8'), json=file=>JSON.parse(read(file)), sha=value=>createHash('sha256').update(value).digest('hex')
const manifest=json('packages/components/src/constant/entries.json'), baseline=json(`${directory}/unchanged-initial-baseline.json`), run=json('test-results/v1-css-selector-fix/results.json')
const packageNames={base:'aheart-ui',ai:'@aheart-ui/ai',dnd:'@aheart-ui/dnd'}, packageDirs={base:'components',ai:'ai',dnd:'dnd'}
const canonical=(domain,entry)=>entry.sourceEntry?entry:manifest[domain].find(candidate=>`${candidate.subpath}/index`===entry.output)
const closure=(domain,entry,found=new Map())=>{
 const key=`${domain}/${entry.subpath}`;if(found.has(key))return found
 found.set(key,{domain,entry});const own=canonical(domain,entry)
 if(own!==entry)closure(domain,own,found)
 for(const dep of own.dependencies??[]){const [target,subpath]=dep.includes('/')?dep.split('/'):[domain,dep];closure(target,manifest[target].find(item=>item.subpath===subpath),found)}
 return found
}
const style=(domain,entry,format='es')=>readFileSync(path.join(run.consumer,'node_modules',packageNames[domain],format,entry.styleOutput??`${entry.subpath}/style.css`))
const report={scope:'independent post-extraction source-selector audit and actual installed tarball measurements; budget failure is not suppressed',gateExitCode:Number(read(`${directory}/packed-gate.exit-code`)),consumer:run.consumer,tarballs:run.tarballs,denominator:run.denominator,entries:[],sourceAudit:{checked:0,excludedFixtures:[],missing:[]},fullStyles:[],protectedSource:[]}
const kebab=name=>name.replace(/([a-z0-9])([A-Z])/g,'$1-$2').toLowerCase()
const belongs=(name,scopes)=>scopes.some(scope=>name===scope||name.startsWith(scope+'__')||name.startsWith(scope+'--'))
for(const [domain,entries] of Object.entries(manifest).filter(([domain])=>domain in packageNames))for(const entry of entries){
 const key=`${domain}/${entry.subpath}`,css=style(domain,entry),old=baseline.entries[key],same=sha(css)===old.sha256
 assert.deepEqual(css,style(domain,entry,'lib'))
 if(!['ai/agent-workbench','ai/workbench'].includes(key))assert.ok(same,`${key} unexpectedly changed from initial measurement`)
 const dependencies=(canonical(domain,entry).dependencies??[]).map(dep=>{const [target,subpath]=dep.includes('/')?dep.split('/'):[domain,dep];const bytes=style(target,manifest[target].find(item=>item.subpath===subpath)).length;return {entry:`${target}/${subpath}`,bytes,fraction:bytes/css.length}})
 report.entries.push({key,initialBytes:old.bytes,packedBytes:css.length,delta:css.length-old.bytes,sha256:sha(css),unchanged:same,componentFraction:css.length/run.denominator.fullBytes,themePlusFraction:(css.length+run.denominator.themeBytes)/run.denominator.fullBytes,dependencies})
 if(domain==='base')continue
 const family=[...closure(domain,entry).values()],scopes={base:[],ai:[],dnd:[]}
 for(const item of family)scopes[item.domain].push(...(item.domain==='base'?[item.entry.subpath,...(item.entry.names??[]).map(kebab)]:(item.entry.scopes??[])))
 const included=name=>{const owner=name.startsWith('aheart-ai-')?'ai':name.startsWith('aheart-dnd-')?'dnd':'base';const prefix=owner==='base'?'aheart-':`aheart-${owner}-`;return belongs(name.slice(prefix.length),scopes[owner])}
 const actual=new Set();postcss.parse(css.toString()).walkRules(rule=>{for(const selector of rule.selectors)actual.add(selector)})
 for(const target of ['ai','dnd']){
  if(!scopes[target].length)continue
  postcss.parse(read(`packages/${packageDirs[target]}/src/style.css`)).walkRules(rule=>{for(const selector of rule.selectors){
   const classes=[...selector.matchAll(/\.([\w-]+)/g)].map(match=>match[1])
   if(!classes.some(name=>name.startsWith(`aheart-${target}-`)&&belongs(name.slice(`aheart-${target}-`.length),scopes[target])))continue
   if(classes.some(name=>name.startsWith('d8-fixture'))){report.sourceAudit.excludedFixtures.push({entry:key,selector});continue}
   if(!classes.filter(name=>name.startsWith('aheart-')).every(included))continue
   report.sourceAudit.checked++;if(!actual.has(selector))report.sourceAudit.missing.push({entry:key,selector})
  }})
 }
}
const mixed='.aheart-dnd-sortable-item:last-child .aheart-ai-workbench__timeline-item::before'
for(const subpath of ['agent-workbench','workbench']){const entry=manifest.ai.find(item=>item.subpath===subpath),css=style('ai',entry).toString();assert.equal(css.split(mixed).length-1,1)}
for(const [domain,directory] of Object.entries(packageDirs)){
 const file=domain==='base'?'packages/components/es/full.css':`packages/${directory}/src/style.css`,frozen=execFileSync('git',['show',`b1eef9b6:${file}`]);assert.equal(sha(frozen),sha(readFileSync(file)))
 report.fullStyles.push({file,sha256:sha(frozen),unchangedFromV0:true})
}
const protectedFiles=json('evidence/V1/baseline.json').protectedSourceSha256
for(const [file,initial] of Object.entries(protectedFiles)){
 const current=sha(readFileSync(file)),changed=current!==initial,allowed=['scripts/m1-consumer.mjs','scripts/fixtures/m3-consumer/probe.mjs'].includes(file)
 assert.ok(!changed||allowed,`protected file changed: ${file}`);report.protectedSource.push({file,sha256:current,unchanged:!changed,ownerApprovedAssertionChange:changed&&allowed})
}
assert.equal(report.gateExitCode,1);assert.deepEqual(report.sourceAudit.missing,[])
assert.equal(report.entries.filter(entry=>!entry.unchanged).length,2)
assert.equal(sha(readFileSync('evidence/V1/css-baselines.json')),sha(readFileSync(`${directory}/unchanged-initial-baseline.json`)))
report.status='selector fix verified; CSS non-increase gate fails; baseline unchanged'
writeFileSync(`${directory}/verification.json`,JSON.stringify(report,null,2)+'\n')
console.log(JSON.stringify({status:report.status,entries:report.entries.length,changed:report.entries.filter(entry=>!entry.unchanged),sourceAudit:report.sourceAudit,protectedUnchanged:report.protectedSource.filter(item=>item.unchanged).length},null,2))
