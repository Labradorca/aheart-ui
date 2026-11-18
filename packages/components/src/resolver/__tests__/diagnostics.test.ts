// @vitest-environment node
import assert from 'node:assert/strict'
import { test } from 'vitest'
import { parseAst } from 'vite'
import { AheartV2DeprecationDiagnostics } from '../diagnostics'

const setup = (command = 'serve', mode = 'development') => {
  const plugin = AheartV2DeprecationDiagnostics(), messages: string[] = []
  plugin.apply({}, { command, mode })
  const transform = (source: string, id = '/src/App.ts') => plugin.transform.call({ parse: parseAst, warn(message: string) { messages.push(message) } }, source, id)
  return { plugin, messages, transform }
}
test('development diagnostics detect affected imports/re-exports once per file and code', () => {
  const { transform, messages } = setup()
  const source = "import UI,{default as Other,Button} from 'aheart-ui';import {AIAgentWorkbench as WB} from '@aheart-ui/ai';export{default as Plugin}from'aheart-ui'"
  transform(source); transform(source)
  assert.equal(messages.length, 2)
  assert.match(messages[0], /B1.*aheart-ui\/full/)
  assert.match(messages[1], /B3.*agent-workbench/)
})
test('recommended named/full/scoped imports never produce deprecation warnings', () => {
  const { transform, messages } = setup()
  transform("import {Button}from'aheart-ui';import UI from'aheart-ui/full';import{AISender}from'@aheart-ui/ai';import{AIAgentWorkbench}from'@aheart-ui/ai/agent-workbench';import*as Core from'aheart-ui';console.log(Core.Button)")
  assert.deepEqual(messages, [])
})
test('namespace and direct dynamic/CommonJS accesses respect lexical shadowing', () => {
  const { transform, messages } = setup()
  transform("import*as Core from'aheart-ui';function f(Core){return Core.default}function g(){if(true){var Core={}}return Core.default}try{}catch(Core){Core.default}for(const Core of []){Core.default}")
  assert.deepEqual(messages, [])
  transform("import*as Core from'aheart-ui';console.log(Core['default'],(await import('@aheart-ui/ai')).AIAgentWorkbench,require('aheart-ui').default)", '/src/Usage.js')
  assert.equal(messages.length, 2)
})
test('production build and production-mode serving never emit diagnostics', () => {
  for (const [command, mode] of [['build','production'],['build','development'],['serve','production']]) {
    const { transform, messages } = setup(command, mode)
    transform("import UI from'aheart-ui';import{AIAgentWorkbench}from'@aheart-ui/ai'")
    assert.deepEqual(messages, [])
  }
})
test('nested destructuring, rest, defaults, block declarations and named functions shadow namespaces', () => {
  const { transform, messages } = setup()
  transform("import*as Core from'aheart-ui';function a({x:Core}){return Core.default}function b([,Core={}]){return Core.default}const c=(...Core)=>Core.default;const d=function Core(){return Core.default};{const Core={};Core.default}{class Core{};Core.default}")
  assert.deepEqual(messages, [])
})
test('named class expressions and switch lexical scopes do not shadow the switch discriminant', () => {
  const { transform, messages } = setup()
  transform("import*as Core from'aheart-ui';const C=class Core{field=Core.default};switch('x'){case'x':let Core={};Core.default;break}")
  assert.deepEqual(messages, [])
  transform("import*as Core from'aheart-ui';switch(Core.default){case'x':let Core={};Core.default;break}", '/src/Switch.js')
  assert.equal(messages.length, 1)
})
test('quoted imports, AI default Plugin and root star exports diagnose affected surfaces', () => {
  const { transform, messages } = setup()
  transform("import AI from'@aheart-ui/ai';import{'AIAgentWorkbench' as WB}from'@aheart-ui/ai';export*from'@aheart-ui/ai'")
  assert.equal(messages.length, 1)
  assert.match(messages[0], /B3/)
  transform("export*from'aheart-ui'", '/src/NamedBarrel.js')
  assert.equal(messages.length, 1)
})
test('new build cycles reset deduplication; non-JS and Vue styles are ignored', () => {
  const { plugin, transform, messages } = setup()
  const source="import UI from'aheart-ui'"
  transform(source);plugin.buildStart();transform(source)
  assert.equal(messages.length, 2)
  transform(source, '/src/styles.css');transform(source, '/src/App.vue?vue&type=style&lang.css')
  assert.equal(messages.length, 2)
})
test('foreign namespaces, computed dynamic members and parser failures stay safe', () => {
  const { plugin, transform, messages } = setup()
  transform("import*as Vue from'vue';Vue.default;import*as Core from'aheart-ui';Core[name];function f(require){return require('aheart-ui').default}")
  assert.deepEqual(messages, [])
  plugin.transform.call({ parse() { throw new Error('unsupported source') }, warn(message: string) { messages.push(message) } }, 'invalid input', '/src/Unsupported.ts')
  plugin.transform.call({ parse() { return undefined }, warn(message: string) { messages.push(message) } }, '', '/src/Empty.js')
  assert.deepEqual(messages, [])
})
