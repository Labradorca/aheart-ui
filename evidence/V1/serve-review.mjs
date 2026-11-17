// Local-only review server; uses already-built real-tarball consumer applications.
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
const json=async file=>JSON.parse(await readFile(file,'utf8'))
const pilots=await json('test-results/v1-pilots/legacy-chromium-r2/results.json')
const consumer=await json('test-results/v1-consumer-final/results.json')
if(pilots.status!=='passed'||consumer.status!=='passed')throw new Error('Review requires successful actual-package consumer runs')
const targets=[...pilots.pilots.map(pilot=>({name:pilot.name,root:pilot.project,page:'ssr.html'})),{name:'full/scoped 13-field + Workbench comparison',root:path.join(consumer.consumer,'visual-contract'),page:'scoped.html'}]
const servers=[]
const close=async()=>{await Promise.all(servers.map(server=>new Promise(resolve=>server.httpServer.close(resolve))));process.exit()}
process.once('SIGINT',close);process.once('SIGTERM',close)
try{
 for(const [index,target] of targets.entries()){
  const viteRoot=index<2?target.root:consumer.consumer
  const {preview}=await import(pathToFileURL(path.join(viteRoot,'node_modules/vite/dist/node/index.js')).href)
  const server=await preview({root:target.root,configFile:false,logLevel:'error',build:{outDir:'dist'},preview:{host:'127.0.0.1',port:5191+index,strictPort:true}})
  servers.push(server);console.log(`${target.name}: http://127.0.0.1:${5191+index}/${target.page}`)
 }
 console.log('Runtime package source: f20bc49; exact tarball fingerprints in evidence/V1/acceptance/visual/results.json. No user acceptance inferred.')
}catch(error){console.error(error);await close()}
