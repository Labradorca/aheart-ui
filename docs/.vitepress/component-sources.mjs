import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { fullStyleSources } from '../../packages/components/build/entries.mjs'
import { getComponentEntries } from '../../packages/build/package-entries.mjs'
import { componentStyleClosure } from '../../packages/build/split-styles.mjs'

const packages = {
  base: ['aheart-ui', 'components'],
  ai: ['@aheart-ui/ai', 'ai'],
  dnd: ['@aheart-ui/dnd', 'dnd']
}

const source = (directory, filename) =>
  fileURLToPath(new URL(`../../packages/${directory}/src/${filename}`, import.meta.url))
const exact = (request, replacement) => ({
  find: new RegExp('^' + request.replaceAll('.', '\\.') + '$'),
  replacement
})
const fullCss = '\0aheart-docs/full.css'
const componentStyles = new Map()

export const componentSourceAliases = [
  exact('@aheart-ui/ai/full', source('ai', 'full.ts')),
  exact('aheart-ui/full', source('components', 'full.ts')),
  exact('aheart-ui/full.css', fullCss),
  exact('aheart-ui/style.css', fullCss),
  exact('aheart-ui/es/style.css', fullCss),
  exact('aheart-ui/theme.css', source('components', 'theme/index.css')),
  exact('aheart-ui/constant', source('components', 'constant/index.ts')),
  exact('aheart-ui/resolver', source('components', 'resolver/index.ts')),
  ...Object.entries(packages).flatMap(([domain, [name, directory]]) => {
    const entries = getComponentEntries(domain)
    const canonical = new Map(entries.filter(entry => entry.sourceEntry).map(entry => [`${entry.subpath}/index`, entry.sourceEntry]))
    const aliases = entries.flatMap(entry => {
      const filename = entry.sourceEntry ?? canonical.get(entry.output)
      if (!filename) throw new Error(`Missing source for ${name}/${entry.subpath}`)
      const id = `\0aheart-docs/${domain}/${entry.subpath}.css`
      componentStyles.set(id, { domain, subpath: entry.subpath })
      return [
        exact(`${name}/${entry.subpath}`, source(directory, filename.replace(/^src\//, ''))),
        exact(`${name}/${entry.subpath}/style.css`, id)
      ]
    })
    return [
      exact(name, source(directory, 'index.ts')),
      ...(domain === 'base' ? [] : [exact(`${name}/style.css`, source(directory, 'style.css'))]),
      ...aliases
    ]
  })
]

export function sourceComponentStyles() {
  return {
    name: 'aheart-docs-full-styles',
    resolveId(id) {
      return id === fullCss || componentStyles.has(id) ? id : undefined
    },
    load(id) {
      const component = componentStyles.get(id)
      if (id !== fullCss && !component) return
      const files = fullStyleSources.map(file => source('components', file))
      for (const file of files) this.addWatchFile(file)
      if (component) {
        for (const domain of ['ai', 'dnd']) this.addWatchFile(source(domain, 'style.css'))
        return componentStyleClosure(component.domain, component.subpath)
      }
      return files.map(file => readFileSync(file, 'utf8').trimEnd()).join('\n') + '\n'
    }
  }
}
