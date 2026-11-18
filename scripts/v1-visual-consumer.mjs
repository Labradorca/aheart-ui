import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { chromium, firefox, webkit } from '@playwright/test'

const arg = key => { const at=process.argv.indexOf(key);return at<0?undefined:process.argv[at+1] }
const source=JSON.parse(await readFile(arg('--consumer-results')??'test-results/v1-consumer/results.json','utf8'))
assert.equal(source.status,'passed','requires a successful real-tarball V1 consumer run')
const consumer=source.consumer,out=path.resolve(arg('--out')??'test-results/v1-visual-consumer')
const project=path.join(consumer,'visual-contract')
await mkdir(project,{recursive:true});await mkdir(out,{recursive:true})
const result={status:'failed',scope:'actual tarball AIForm 13 fields + Workbench: SSR/hydration, full-versus-scoped CSS equivalence and date range readability',tarballs:source.tarballs,sourceSha:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),cases:[]}
const dateRangeValues = ['2026-11-17', '2026-11-18']
const captureDateRange = async (page, engine, mode, width) => {
  if (width === 390) await page.setViewportSize({ width, height: 844 })
  const picker = page.locator('#form-fixture .aheart-date-range-picker')
  await picker.scrollIntoViewIfNeeded()
  const inputs = await picker.locator('input[data-range-part]').evaluateAll(elements => {
    const canvas = document.createElement('canvas').getContext('2d')
    return elements.map(input => {
      const style = getComputedStyle(input)
      canvas.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
      const requiredWidth = Math.ceil(canvas.measureText(input.value).width + parseFloat(style.paddingLeft) + parseFloat(style.paddingRight))
      const rect = input.getBoundingClientRect()
      const unobscured = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2) === input
      return { part: input.dataset.rangePart, value: input.value, visibleWidth: input.clientWidth, scrollWidth: input.scrollWidth, requiredWidth, unobscured }
    })
  })
  const viewport = page.viewportSize()
  assert.deepEqual(inputs.map(input => input.value), dateRangeValues)
  assert.ok(inputs.every(input => input.unobscured), `${engine}/${width}/${mode}: date range inputs must be visible before capture`)
  if (width !== 390) return { viewport, inputs }
  const screenshot = `${engine}-390-date-range-${mode}.png`
  const buffer = await picker.screenshot({ path: path.join(out, screenshot), animations: 'disabled', caret: 'hide' })
  return { viewport, inputs, screenshot, sha256: createHash('sha256').update(buffer).digest('hex') }
}
const fixture=`import {h,ref,onMounted,nextTick} from 'vue';import {AIForm,AI_FORM_FIELD_TYPES} from '@aheart-ui/ai/form';import {AIAgentWorkbench} from '@aheart-ui/ai/agent-workbench';
export const createFixture=()=>({setup(){const form=ref(),model=ref(Object.fromEntries(AI_FORM_FIELD_TYPES.map((type,index)=>['field'+index,type==='checkbox'||type==='upload'?[]:type==='switch'?true:type==='number'?3:type==='date'?'2026-11-17':type==='date-range'?${JSON.stringify(dateRangeValues)}:type==='time'?'09:00:00':type==='time-range'?['09:00:00','10:00:00']:['select','radio','tree-select'].includes(type)?'a':'Example'])));
const fields=AI_FORM_FIELD_TYPES.map((type,index)=>({key:'field'+index,label:type,type,...(['select','checkbox','radio','tree-select'].includes(type)?{options:[{label:'Option A',value:'a'}]}:{})}));
onMounted(async()=>{await nextTick();window.__form=form.value;window.__model=model;window.__ready=true});
return()=>h('main',[h('h1','V1 packed CSS comparison'),h('section',{id:'form-fixture'},[h('h2','AIForm — all 13 field types'),h(AIForm,{ref:form,schema:{version:'1',fields},modelValue:model.value,'onUpdate:modelValue':value=>model.value=value})]),h('section',{id:'workbench-fixture'},[h(AIAgentWorkbench,{title:'Packed Workbench',scopeKey:'visual-v1',tasks:[{id:'one',label:'Inspect styles',status:'complete',revision:1},{id:'two',label:'Verify timeline',status:'pending',revision:1}],reorderable:true})])]);}})
`
await writeFile(path.join(project,'fixture.js'),fixture)
await writeFile(path.join(project,'ssr.mjs'),`import {createSSRApp} from 'vue';import {renderToString} from 'vue/server-renderer';import {createFixture} from './fixture.js';console.log(await renderToString(createSSRApp(createFixture())))`)
const html=execFileSync(process.execPath,[path.join(project,'ssr.mjs')],{cwd:consumer,encoding:'utf8',maxBuffer:4*1024*1024})
assert.equal(html.split('data-field-key=').length-1,13)
for(const mode of ['full','scoped']){
 const imports=mode==='full'?['aheart-ui/full.css','@aheart-ui/dnd/style.css','@aheart-ui/ai/style.css']:['aheart-ui/theme.css','@aheart-ui/ai/form/style.css','@aheart-ui/ai/agent-workbench/style.css']
 await writeFile(path.join(project,`${mode}.js`),imports.map(request=>`import '${request}';`).join('\n')+`\nimport {createSSRApp} from 'vue';import {createFixture} from './fixture.js';createSSRApp(createFixture()).mount('#app')`)
 await writeFile(path.join(project,`${mode}.html`),`<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>V1 ${mode}</title><style>body{margin:0;padding:24px;font-family:system-ui}main{max-width:1280px;margin:auto}section{margin-bottom:32px}</style></head><body><div id="app">${html}</div><script type="module" src="./${mode}.js"></script></body></html>`)
}
const {build,preview}=await import(pathToFileURL(path.join(consumer,'node_modules/vite/dist/node/index.js')).href)
let server
try{
 await build({root:project,configFile:false,logLevel:'error',build:{rollupOptions:{input:['full','scoped'].map(mode=>path.join(project,`${mode}.html`))}}})
 server=await preview({root:project,configFile:false,logLevel:'error',preview:{host:'127.0.0.1',port:0}})
 const url=`http://127.0.0.1:${server.httpServer.address().port}`
 for(const [engine,launcher] of Object.entries({chromium,firefox,webkit})){
  const browser=await launcher.launch(engine==='firefox'?{firefoxUserPrefs:{'network.proxy.type':0}}:{})
  try{for(const width of [1440,390]){
   const screenshots=[], dateRanges=[]
   for(const mode of ['full','scoped']){
    const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce',...(width===390&&engine!=='firefox'?{isMobile:true,hasTouch:true}:{})})
    try{
     const page=await context.newPage(),errors=[]
     page.on('pageerror',error=>errors.push(error.message));page.on('console',message=>{if(['warning','error'].includes(message.type()))errors.push(message.text())})
     await page.goto(`${url}/${mode}.html`);await page.waitForFunction(()=>window.__ready)
     assert.equal(await page.locator('[data-field-key]').count(),13)
     const exposed=await page.evaluate(()=>['validate','resetFields','clearValidate','setFieldsErrors'].every(name=>typeof window.__form[name]==='function'))
     assert.equal(exposed,true)
     const input=page.getByLabel('input',{exact:true});await input.fill('Changed')
     await page.waitForFunction(()=>window.__model.value.field0==='Changed')
     await page.evaluate(async()=>{await window.__form.resetFields();await window.__form.clearValidate()})
     assert.equal(await input.inputValue(),'Example')
     await page.locator('h1').click()
     await page.evaluate(() => document.fonts.ready)
     const dateRange = await captureDateRange(page, engine, mode, width)
     dateRanges.push(dateRange)
     if (width === 390) await page.setViewportSize({ width, height: 1000 })
     await page.locator('h1').click()
     if(width===390){await page.getByRole('tab',{name:'执行',exact:true}).click();await page.getByRole('button',{name:'查看执行与产物',exact:true}).click()}
     const timeline=page.locator('.aheart-dnd-sortable-item:last-child .aheart-ai-workbench__timeline-item').filter({visible:true})
     assert.equal(await timeline.count(),1)
     assert.match(await page.locator('.aheart-ai-workbench__progress').innerText(),/1\s*\/\s*2/)
     assert.equal(await timeline.evaluate(node=>getComputedStyle(node,'::before').display),'none')
     await page.evaluate(async()=>{await document.fonts.ready;await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))})
     const screenshot=`${engine}-${width}-${mode}.png`,buffer=await page.screenshot({path:path.join(out,screenshot),fullPage:true,animations:'disabled',caret:'hide'})
     screenshots.push(buffer)
     result.cases.push({engine,browserVersion:browser.version(),viewport:{width,height:1000},mode,url:page.url(),fields:13,exposedMethods:true,modelUpdateReset:true,lastTimelineConnectorHidden:true,errors,screenshot,sha256:createHash('sha256').update(buffer).digest('hex'),dateRange})
     assert.deepEqual(errors,[])
    }finally{await context.close()}
   }
   assert.deepEqual(screenshots[0],screenshots[1],`${engine}/${width}: full and scoped CSS render differently`)
   if (width === 390) {
     assert.equal(dateRanges[0].sha256, dateRanges[1].sha256, `${engine}/390: full and scoped date range screenshots differ`)
   }
  }}finally{await browser.close()}
 }
 const clipped = result.cases.flatMap(({ engine, mode, dateRange }) =>
  dateRange.inputs.filter(input => input.visibleWidth < Math.max(input.requiredWidth, input.scrollWidth))
   .map(input => ({ engine, mode, viewport: dateRange.viewport, ...input })))
 assert.deepEqual(clipped, [], 'Date range inputs must display both complete dates')
 result.status='passed';result.pixelComparison='six engine/viewport pairs are byte-identical; 12 screenshots';result.ssrFields=13
 result.dateRangeComparison='three full/scoped pairs are byte-identical at 390 × 844; both dates fit in all 12 cases'
}catch(error){result.error=error.stack??String(error);process.exitCode=1}finally{if(server)await new Promise(resolve=>server.httpServer.close(resolve));await writeFile(path.join(out,'results.json'),JSON.stringify(result,null,2)+'\n');await writeFile(path.join(out,'exit-code'),result.status==='passed'?'0\n':'1\n')}
console.log(JSON.stringify({status:result.status,cases:result.cases.length,error:result.error,pixelComparison:result.pixelComparison},null,2))
