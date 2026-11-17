import { execFileSync, spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'

const directory='evidence/V1/checks'
mkdirSync(directory,{recursive:true})
const checks={
  'build-components':['corepack','pnpm','build:components'],
  build:['corepack','pnpm','build'],
  drift:['node','--test','scripts/v1-entry-manifest.test.mjs'],
  'docs-and-matrix':['node','--test','scripts/docs-copy.test.mjs','scripts/docs-social-icon.test.mjs','scripts/qg5-evidence-docs.test.mjs','scripts/m3-doc-entries.test.mjs','scripts/quality-matrix.test.mjs','scripts/qg5-skip-ledger.test.mjs'],
  docs:['corepack','pnpm','docs:build'],
  types:['corepack','pnpm','typecheck'],
  unit:['corepack','pnpm','test'],
  pack:['corepack','pnpm','release:pack','--pack-destination','test-results/release-tarballs'],
  strict:['corepack','pnpm','check:consumer-types'],
  'm1-consumer':['corepack','pnpm','check:m1-consumer'],
  'm3-consumer':['corepack','pnpm','check:m3-consumer'],
  'v1-consumer':['node','scripts/v1-consumer.mjs'],
  diff:['git','diff','--check']
}
const resultsFile=`${directory}/results.json`
const results=existsSync(resultsFile)?JSON.parse(readFileSync(resultsFile,'utf8')):[]
for(const result of results)result.workingDiffCommand??=['git','diff','--binary']
const hash=value=>createHash('sha256').update(value).digest('hex')
let failed=false
for(const name of process.argv.slice(2)){
  const command=checks[name]
  if(!command)throw new Error(`Unknown check: ${name}`)
  const record={name,command,baseline:'b1eef9b6f5e1b64706beee5d4d56e08891f27c26',head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),scope:'recorded HEAD plus V1 working diff',workingDiffCommand:['git','diff','HEAD','--binary'],workingDiffSha256:hash(execFileSync('git',['diff','HEAD','--binary'],{maxBuffer:64*1024*1024})),startedAt:new Date().toISOString()}
  const run=spawnSync(command[0],command.slice(1),{encoding:'utf8',maxBuffer:64*1024*1024})
  const raw=`${run.stdout??''}${run.stderr??''}${run.error?String(run.error):''}`
  const output=raw.split('\n').map(line=>line.trimEnd()).join('\n')
  writeFileSync(`${directory}/${name}.txt`,output)
  writeFileSync(`${directory}/${name}.exit-code`,`${run.status}\n`)
  Object.assign(record,{finishedAt:new Date().toISOString(),exitCode:run.status,signal:run.signal,rawOutputSha256:hash(raw),output:`${name}.txt`,normalization:'trailing whitespace only'})
  const previous=results.findIndex(r=>r.name===name)
  if(previous>=0)results.splice(previous,1)
  results.push(record)
  writeFileSync(resultsFile,JSON.stringify(results,null,2)+'\n')
  console.log(`${name}: exit ${run.status}`)
  if(run.status!==0){failed=true;break}
}
if(failed)process.exitCode=1
