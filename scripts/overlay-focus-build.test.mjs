import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const root = new URL('..', import.meta.url)
const internalHelpers = ['overlay-controller', 'use-trigger-aria']

test('D2 overlay helpers stay internal and ship paired ESM and CommonJS files', () => {
  const publicEntry = readFileSync(new URL('./packages/components/src/index.ts', root), 'utf8')

  for (const helper of internalHelpers) {
    assert.doesNotMatch(publicEntry, new RegExp(`utils/${helper}`))
    assert.equal(existsSync(new URL(`./packages/components/dist/types/utils/${helper}.d.ts`, root)), true)
    for (const format of ['esm', 'cjs']) {
      assert.equal(existsSync(new URL(`./packages/components/dist/${format}/utils/${helper}.js`, root)), true)
    }
  }

  for (const format of ['esm', 'cjs']) {
    const dismiss = readFileSync(new URL(`./packages/components/dist/${format}/utils/use-floating-dismiss.js`, root), 'utf8')
    assert.match(dismiss, /overlay-controller/)
  }
})
