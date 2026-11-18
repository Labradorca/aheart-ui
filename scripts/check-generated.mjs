import { execFileSync } from 'node:child_process'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

export const GENERATED_PATHS = [
  'packages/components/dist',
  'packages/dnd/es',
  'packages/dnd/lib',
  'packages/ai/dist'
]
const forbiddenPaths = [...GENERATED_PATHS, 'packages/components/es', 'packages/components/lib', 'packages/ai/es', 'packages/ai/lib']

export const assertNoUntrackedGeneratedFiles = (output) => {
  const files = output.trim()
  if (files) throw new Error(`Untracked generated files:\n${files}`)
}

export const checkGeneratedOutput = (cwd = process.cwd()) => {
  const list = options => execFileSync('git', ['ls-files', ...options, '--', ...forbiddenPaths], { cwd, encoding: 'utf8' })
  const tracked = list(['--cached']).trim()
  if (tracked) throw new Error(`Generated files must not be tracked:\n${tracked}`)
  assertNoUntrackedGeneratedFiles(list(['--others', '--exclude-standard']))
}

const isCli = process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href

if (isCli) {
  try {
    checkGeneratedOutput()
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  }
}
