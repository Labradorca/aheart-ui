import { readFileSync, readdirSync, rmSync } from 'node:fs'
import { posix } from 'node:path'
import ts from 'typescript'
import { emitDistFile } from './dist-layout.mjs'

function filesUnder(directory) {
  return readdirSync(directory, { withFileTypes: true })
    .sort((first, second) => first.name.localeCompare(second.name))
    .flatMap(entry => entry.isDirectory()
      ? filesUnder(new URL(`${entry.name}/`, directory)).map(file => `${entry.name}/${file}`)
      : [entry.name])
}

function hasDefaultExport(filename, contents) {
  const source = ts.createSourceFile(filename, contents, ts.ScriptTarget.Latest)
  return source.statements.some(node => {
    if (ts.isExportAssignment(node)) return !node.isExportEquals
    if (ts.isExportDeclaration(node) && node.exportClause && ts.isNamedExports(node.exportClause)) {
      return node.exportClause.elements.some(element => element.name.text === 'default')
    }
    return ts.canHaveModifiers(node) && ts.getModifiers(node)?.some(modifier => modifier.kind === ts.SyntaxKind.DefaultKeyword)
  })
}

function esmForwarder(directory, target, request, filename) {
  const contents = readFileSync(new URL(`dist/${target}`, directory), 'utf8')
  const named = `export * from ${JSON.stringify(request)};\n`
  return hasDefaultExport(filename, contents)
    ? named + `export { default } from ${JSON.stringify(request)};\n`
    : named
}

export function emitLegacyFacades(directory, { root = 'index', rootStyle = 'style.css' } = {}) {
  const distFiles = folder => filesUnder(new URL(`dist/${folder}/`, directory))
  const readDist = file => readFileSync(new URL(`dist/${file}`, directory))
  const original = file => file.startsWith('compat/') ? [] : [file]
  const styles = distFiles('styles')
  rmSync(new URL('dist/compat/', directory), { recursive: true, force: true })
  for (const [legacy, format] of [['es', 'esm'], ['lib', 'cjs']]) {
    const facade = `compat/${legacy}`
    const emit = (file, contents) => emitDistFile(directory, `${facade}/${file}`, contents)
    const relative = (file, target) => posix.relative(posix.dirname(`${facade}/${file}`), target)

    for (const file of distFiles(format).flatMap(original)) {
      if (!file.endsWith('.js')) continue
      const target = `${format}/${file === 'index.js' ? `${root}.js` : file}`
      const request = relative(file, target)
      emit(file, format === 'cjs'
        ? `module.exports = require(${JSON.stringify(request)});\n`
        : esmForwarder(directory, target, request, file))
    }
    for (const file of distFiles('types').flatMap(original)) {
      if (!file.endsWith('.d.ts')) continue
      const target = `types/${file === 'index.d.ts' ? `${root}.d.ts` : file}`
      const request = relative(file, target.replace(/\.d\.ts$/, '.js'))
      emit(file, esmForwarder(directory, target, request, file))
    }
    for (const file of styles) emit(file, readDist(`styles/${file}`))
    if (rootStyle !== 'style.css') emit('style.css', readDist(`styles/${rootStyle}`))
    emit('package.json', readDist(`${format}/package.json`))
  }
}
