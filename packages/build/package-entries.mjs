import { readFileSync } from 'node:fs'
import { distRuntimeExport } from './dist-layout.mjs'

const manifest = JSON.parse(readFileSync(new URL('../components/src/constant/entries.json', import.meta.url), 'utf8'))

export const getComponentEntries = (domain) => manifest[domain]

export const entryInput = (entries) => Object.fromEntries([
  ['index', 'src/index.ts'],
  ...entries.filter(({ sourceEntry }) => sourceEntry)
    .map(({ subpath, sourceEntry }) => [`${subpath}/index`, sourceEntry])
])

export const runtimeExport = (output) => ({
  types: `./es/${output}.d.ts`, import: `./es/${output}.js`, require: `./lib/${output}.js`
})

export function optionalPackageExports(entries, { dist = false, fullEntry = 'index' } = {}) {
  const runtime = dist ? distRuntimeExport : runtimeExport
  const styles = dist ? './dist/styles' : './es'
  return {
    './full': runtime(fullEntry),
    './full.css': `${styles}/style.css`,
    ...Object.fromEntries(entries.flatMap(({ subpath, output, styleOutput }) => [
      [`./${subpath}`, runtime(output ?? `${subpath}/index`)],
      [`./${subpath}/style.css`, `${styles}/${styleOutput ?? `${subpath}/style.css`}`]
    ]))
  }
}
