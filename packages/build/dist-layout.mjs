import { mkdirSync, writeFileSync } from 'node:fs'

export function emitDistFile(directory, name, contents) {
  const target = new URL(`dist/${name}`, directory)
  mkdirSync(new URL('.', target), { recursive: true })
  writeFileSync(target, contents)
}

export function emitDistModuleMetadata(directory) {
  for (const [folder, type] of [['esm', 'module'], ['cjs', 'commonjs']]) {
    emitDistFile(directory, `${folder}/package.json`, JSON.stringify({ type, sideEffects: ['**/*.css'] }, null, 2) + '\n')
  }
}

export const distRuntimeExport = output => ({
  types: `./dist/types/${output}.d.ts`,
  import: `./dist/esm/${output}.js`,
  require: `./dist/cjs/${output}.js`
})
