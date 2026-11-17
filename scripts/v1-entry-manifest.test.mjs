import assert from 'node:assert/strict'
import test from 'node:test'
import {loadEntrySnapshot,validateEntrySnapshot} from './v1-entry-manifest.mjs'

const actual=await loadEntrySnapshot()

test('all Ready families and existing domain paths agree across exports, Resolver, actual sidebar and quality matrix',()=>{
  const result=validateEntrySnapshot(actual)
  assert.deepEqual(result.errors,[])
  assert.deepEqual(result.coverage.entries,{base:45,ai:16,dnd:4})
  assert.equal(result.coverage.ready,49)
  assert.equal(result.coverage.readyCovered,49)
  assert.equal(result.coverage.navigationReady,49)
})

test('entry gate rejects a missing stylesheet export',()=>{
  const packages=structuredClone(actual.packages)
  delete packages.base.exports['./table/style.css']
  assert.ok(validateEntrySnapshot({...actual,packages}).errors.some(error=>error==='aheart-ui/table: stylesheet export drift'))
})

test('entry gate rejects missing Table Resolver support rather than hiding an uncovered Ready component',()=>{
  const resolver=options=>{
    const delegate=actual.resolver(options)
    return name=>name==='ATable'?undefined:delegate(name)
  }
  assert.ok(validateEntrySnapshot({...actual,resolver}).errors.some(error=>error==='aheart-ui/table: ATable Resolver CSS drift'))
})

test('entry gate checks the generated documentation sidebar, independently from its catalogue',()=>{
  const navigationLinks=actual.navigationLinks.filter(link=>link!=='/components/table')
  assert.ok(validateEntrySnapshot({...actual,navigationLinks}).errors.includes('table: actual documentation sidebar coverage missing'))
})

test('entry gate rejects a quality record in the wrong package',()=>{
  const qualityMatrix=actual.qualityMatrix.map(record=>record.component==='table'?{...record,package:'@aheart-ui/ai'}:record)
  assert.ok(validateEntrySnapshot({...actual,qualityMatrix}).errors.includes('aheart-ui/table: table quality matrix package drift'))
})

test('a Ready catalogue entry cannot disappear from the manifest while its exports remain',()=>{
  const manifest=structuredClone(actual.manifest)
  manifest.base=manifest.base.filter(entry=>entry.subpath!=='table')
  const errors=validateEntrySnapshot({...actual,manifest}).errors
  assert.ok(errors.includes('table: Ready component is absent from the entry manifest'))
  assert.ok(errors.includes('aheart-ui: public export ./table is outside the manifest'))
})
