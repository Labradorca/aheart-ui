import assert from 'node:assert/strict'
import test from 'node:test'
import ts from 'typescript'
import { migrateSource } from './codemods/aheart-v2.mjs'

test('codemod migrates equivalent legacy root and explicit CSS paths', () => {
  const result = migrateSource(`
import UI, { Button } from 'aheart-ui/es/index.js';
import AIFull, { AIForm } from '@aheart-ui/ai/es/index.js';
import { AheartUIResolver } from 'aheart-ui/es/resolver/index.js';
import 'aheart-ui/es/theme.css';
import '@aheart-ui/ai/style.css';
const Plugin = require('aheart-ui/lib/index.js').default;
`)
  assert.deepEqual(result.manual, [])
  assert.match(result.source, /import UI from ["']aheart-ui\/full["']/)
  assert.match(result.source, /import \{ Button \} from ["']aheart-ui["']/)
  assert.match(result.source, /AIFull, \{ AIForm \} from ['"]@aheart-ui\/ai\/full['"]/)
  assert.match(result.source, /from ['"]aheart-ui\/resolver['"]/)
  assert.match(result.source, /import ['"]aheart-ui\/theme.css['"]/)
  assert.match(result.source, /import ['"]@aheart-ui\/ai\/full.css['"]/)
  assert.match(result.source, /require\('aheart-ui\/full'\)\.default/)
  assert.equal(migrateSource(result.source).changed, false)
})

const valid = code => assert.equal(ts.createSourceFile('fixture.ts', code, ts.ScriptTarget.Latest, true).parseDiagnostics.length, 0)
test('codemod splits root defaults and Workbench, preserves aliases/types and is idempotent', () => {
  const result = migrateSource("import UI, { Button, type ButtonProps } from 'aheart-ui'\nimport AI, { AIAgentWorkbench as Workbench, AISender } from '@aheart-ui/ai'\n")
  valid(result.source)
  assert.match(result.source, /import UI from ["']aheart-ui\/full["']/)
  assert.match(result.source, /Button, type ButtonProps/)
  assert.match(result.source, /import AI from ["']@aheart-ui\/ai\/full["']/)
  assert.match(result.source, /AIAgentWorkbench as Workbench.*@aheart-ui\/ai\/workbench/)
  assert.match(result.source, /AISender.*@aheart-ui\/ai["']/)
  assert.equal(migrateSource(result.source).source, result.source)
})
test('codemod also migrates named-default imports and mixed AI defaults', () => {
  const input = "import {default as UI, Button} from 'aheart-ui';import AI, {default as OtherAI,AIAgentWorkbench as WB,AISender} from '@aheart-ui/ai'"
  const result = migrateSource(input)
  valid(result.source)
  assert.match(result.source, /default as UI.*aheart-ui\/full/)
  assert.match(result.source, /import AI, \{ default as OtherAI \}.*@aheart-ui\/ai\/full/)
  assert.match(result.source, /AIAgentWorkbench as WB.*@aheart-ui\/ai\/workbench/)
  assert.equal(migrateSource(result.source).changed, false)
})
test('codemod preserves comments, compatible named imports and string contents', () => {
  const input = "// keep leading\nimport UI from /* keep module */ 'aheart-ui' // keep trailing\nimport { Button } from 'aheart-ui'\nconst example=\"import UI from 'aheart-ui'\""
  const result = migrateSource(input)
  assert.equal(result.source, input.replace("/* keep module */ 'aheart-ui'", "/* keep module */ 'aheart-ui/full'"))
  const mixed = migrateSource("import UI, { /* button note */ Button } from 'aheart-ui'")
  assert.match(mixed.source, /button note/)
  valid(mixed.source)
})
test('codemod rewrites explicit re-exports and CommonJS/awaited default or Workbench access', () => {
  const input = "export { default as UI, Button } from 'aheart-ui';\nexport { AIAgentWorkbench as Workbench, AISender } from '@aheart-ui/ai';\nconst UI2=require('aheart-ui').default;const WB=require('@aheart-ui/ai').AIAgentWorkbench;const UI3=(await import('aheart-ui')).default;"
  const result = migrateSource(input)
  valid(result.source)
  assert.match(result.source, /default as UI.*aheart-ui\/full/)
  assert.match(result.source, /require\('aheart-ui\/full'\)\.default/)
  assert.match(result.source, /require\('@aheart-ui\/ai\/workbench'\)\.AIAgentWorkbench/)
  assert.match(result.source, /import\('aheart-ui\/full'\)/)
})
test('codemod maps only declared equivalent legacy paths and keeps private/cross-format paths', () => {
  const result = migrateSource("import Button from 'aheart-ui/es/button/index.js'; import 'aheart-ui/lib/button/style.css'; const x=require('@aheart-ui/dnd/lib/sortable/index.js');import Unknown from 'aheart-ui/es/private/index.js';import Cjs from 'aheart-ui/lib/button/index.js'")
  assert.match(result.source, /from 'aheart-ui\/button'/)
  assert.match(result.source, /'aheart-ui\/button\/style.css'/)
  assert.match(result.source, /require\('@aheart-ui\/dnd\/sortable'\)/)
  assert.match(result.source, /aheart-ui\/es\/private\/index.js/)
  assert.match(result.source, /aheart-ui\/lib\/button\/index.js/)
  assert.equal(result.manual.length, 2)
})
test('codemod edits both Vue script blocks without touching template/style', () => {
  const input = `<template><pre>import UI from 'aheart-ui'</pre></template>\n<script lang="ts">import UI from 'aheart-ui'</script>\n<script setup lang="ts">import {AIAgentWorkbench as WB} from '@aheart-ui/ai'</script><style>.x{content:"aheart-ui"}</style>`
  const result = migrateSource(input, 'App.vue')
  assert.match(result.source, /<template><pre>import UI from 'aheart-ui'<\/pre><\/template>/)
  assert.match(result.source, /aheart-ui\/full/)
  assert.match(result.source, /@aheart-ui\/ai\/workbench/)
  assert.ok(result.source.endsWith('<style>.x{content:"aheart-ui"}</style>'))
  const typed = migrateSource('<script setup lang="ts" generic="T extends Record<string, unknown>">import UI from "aheart-ui"</script>', 'Generic.vue')
  assert.match(typed.source, /generic="T extends Record<string, unknown>"/)
  assert.match(typed.source, /aheart-ui\/full/)
  const template = `<template><pre>{{ "<script>import UI from 'aheart-ui'</script>" }}</pre></template><script setup>import UI from 'aheart-ui'</script>`
  const safe = migrateSource(template, 'Example.vue')
  assert.ok(safe.source.startsWith(template.slice(0, template.indexOf('<script setup>'))))
  assert.match(safe.source.slice(safe.source.indexOf('<script setup>')), /aheart-ui\/full/)
})
test('codemod reports ambiguous namespace/dynamic usage and keeps directive imports for review', () => {
  const input = "import * as Core from 'aheart-ui'; Core.default; const module=await import('@aheart-ui/ai');\n// @ts-expect-error tracked upstream\nimport UI, { Unknown } from 'aheart-ui';"
  const result = migrateSource(input)
  assert.equal(result.source, input)
  assert.equal(result.manual.length, 3)
})
test('codemod respects shadowed module bindings and recognizes Node createRequire aliases', () => {
  const safe = "import * as Core from 'aheart-ui';console.log(Core.Button);function f(Core){return Core.default}"
  assert.deepEqual(migrateSource(safe).manual, [])
  const shadowed = "function mock(require){return require('aheart-ui').default}"
  assert.equal(migrateSource(shadowed).source, shadowed)
  assert.equal(migrateSource(shadowed).manual.length, 1)
  const loader = "import {createRequire as makeRequire}from'node:module';const load=makeRequire(import.meta.url);const UI=load('aheart-ui').default"
  assert.match(migrateSource(loader).source, /load\('aheart-ui\/full'\)/)
  assert.deepEqual(migrateSource('<template><div/></template><script setup>import * as Core from "aheart-ui";console.log(Core.Button);function f(Core){return Core.default}</script>', 'Safe.vue').manual, [])
})
