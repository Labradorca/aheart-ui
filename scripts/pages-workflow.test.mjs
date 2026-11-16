import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

test('Pages deploys only an exact master SHA whose full push CI workflow succeeded', async () => {
  const workflow = await readFile(path.join(root, '.github/workflows/pages.yml'), 'utf8')

  assert.match(workflow, /workflow_run:/)
  assert.match(workflow, /workflows:\s*\n\s*- CI/)
  assert.match(workflow, /branches:\s*\n\s*- master/)
  assert.match(workflow, /if: \$\{\{ github\.event\.workflow_run\.conclusion == 'success' && github\.event\.workflow_run\.event == 'push' \}\}/)
  assert.match(workflow, /ref: \$\{\{ github\.event\.workflow_run\.head_sha \}\}/)
  assert.doesNotMatch(workflow, /\n\s{2}push:/)
  assert.doesNotMatch(workflow, /workflow_dispatch:/)
  assert.match(workflow, /deploy:\s*[\s\S]*needs: build/)
})

test('manual CI completion cannot cancel a push-triggered Pages deployment', async () => {
  const workflow = await readFile(path.join(root, '.github/workflows/pages.yml'), 'utf8')
  assert.match(workflow, /group: pages-\$\{\{ github\.event\.workflow_run\.event \}\}/)
  assert.match(workflow, /cancel-in-progress: true/)
})
