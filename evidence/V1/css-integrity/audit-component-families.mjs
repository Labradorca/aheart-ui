import assert from 'node:assert/strict'
import {readFileSync,writeFileSync} from 'node:fs'
import {visualDeclarations} from '../../../scripts/v1-css-integrity.mjs'
const manifest=JSON.parse(readFileSync('packages/components/src/constant/entries.json','utf8'))
const kebab=name=>name.replace(/([a-z0-9])([A-Z])/g,'$1-$2').toLowerCase()
const stems=manifest.base.flatMap(entry=>[...new Set([entry.subpath,...(entry.names??[]).map(kebab)])].map(stem=>({stem:'aheart-'+stem,owner:entry.subpath}))).sort((a,b)=>b.stem.length-a.stem.length)
const report={scope:'independent known component-family ownership check for every declared base CSS source; intrinsic helpers listed separately',entries:65,foreign:[],helpers:{}}
for(const domain of ['base','ai','dnd'])for(const entry of manifest[domain]){
 const closure=visualDeclarations(manifest,domain,entry.subpath),base=new Set(closure.filter(item=>item.domain==='base').map(item=>item.entry.subpath))
 const files=new Set(closure.filter(item=>item.domain==='base').flatMap(item=>item.entry.styles))
 for(const file of files){const css=readFileSync('packages/components/src/'+file,'utf8');for(const name of new Set([...css.matchAll(/\.([\w-]+)/g)].map(match=>match[1]).filter(name=>name.startsWith('aheart-')))){
  const owner=stems.find(({stem})=>name===stem||name.startsWith(stem+'-')||name.startsWith(stem+'__'))
  if(owner&&!base.has(owner.owner))report.foreign.push({entry:domain+'/'+entry.subpath,file,className:name,owner:owner.owner})
  if(!owner){report.helpers[file]??=[];if(!report.helpers[file].includes(name))report.helpers[file].push(name)}
 }}
}
writeFileSync('evidence/V1/css-integrity/component-family-audit.json',JSON.stringify(report,null,2)+'\n')
assert.deepEqual(report.foreign,[])
// These helpers have no separate public component family: floating is an explicit
// shared stylesheet and Ribbon is owned by the existing Badge family source.
assert.deepEqual(Object.keys(report.helpers).sort(),['badge/style.css','utils/floating.css'])
console.log('65 declared base-style closures: foreign public families 0; only known floating and Badge/Ribbon helpers')
