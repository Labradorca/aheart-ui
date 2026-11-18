import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import ts from 'typescript'
import { parse as parseVue } from 'vue/compiler-sfc'

const manifest = JSON.parse(readFileSync(new URL('../../packages/components/src/constant/entries.json', import.meta.url), 'utf8'))
const domains = { 'aheart-ui': 'base', '@aheart-ui/ai': 'ai', '@aheart-ui/dnd': 'dnd' }
const roots = new Set(['aheart-ui', '@aheart-ui/ai'])
const factory = ts.factory
const importedName = node => (node.propertyName ?? node.name).text

export function migrateSource(source, fileName = 'consumer.ts') {
  const manual = [], changes = []
  const transform = (code, offset = 0) => {
    const virtual = path.resolve(fileName.endsWith('x') ? '__aheart_input.tsx' : '__aheart_input.ts')
    const file = ts.createSourceFile(virtual, code, ts.ScriptTarget.Latest, true, /\.[jt]sx$/.test(fileName) ? ts.ScriptKind.TSX : ts.ScriptKind.TS)
    if (file.parseDiagnostics.length) {
      manual.push({ offset, reason: 'Source parse errors; no automatic edits in this script block' })
      return code
    }
    // Bind this file in memory, without resolving imports, so a local parameter
    // named require/Core is never mistaken for the actual module binding.
    const options = { noLib: true, noResolve: true, target: ts.ScriptTarget.Latest }
    const host = ts.createCompilerHost(options)
    host.getSourceFile = name => name === virtual ? file : undefined
    host.readFile = name => name === virtual ? code : undefined
    host.fileExists = name => name === virtual
    const checker = ts.createProgram([virtual], options, host).getTypeChecker()
    const namespaces = new Map(), factories = new Set(), nodeModules = new Set(), requireBindings = new Set(), reviewed = new Set()
    for (const statement of file.statements) if (ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier)) {
      const request = statement.moduleSpecifier.text, binding = statement.importClause?.namedBindings
      if (binding && ts.isNamespaceImport(binding)) {
        const symbol = checker.getSymbolAtLocation(binding.name)
        if (symbol && roots.has(request)) namespaces.set(symbol, request)
        if (symbol && ['node:module', 'module'].includes(request)) nodeModules.add(symbol)
      }
      if (['node:module', 'module'].includes(request) && binding && ts.isNamedImports(binding)) for (const specifier of binding.elements) if (importedName(specifier) === 'createRequire') { const symbol = checker.getSymbolAtLocation(specifier.name); if (symbol) factories.add(symbol) }
    }
    const collectRequire = item => {
      if (ts.isVariableDeclaration(item) && ts.isIdentifier(item.name) && item.initializer && ts.isCallExpression(item.initializer) && (item.parent.flags & ts.NodeFlags.Const)) {
        const callee = item.initializer.expression
        if ((ts.isIdentifier(callee) && factories.has(checker.getSymbolAtLocation(callee))) || (ts.isPropertyAccessExpression(callee) && callee.name.text === 'createRequire' && nodeModules.has(checker.getSymbolAtLocation(callee.expression)))) requireBindings.add(checker.getSymbolAtLocation(item.name))
      }
      ts.forEachChild(item, collectRequire)
    }
    collectRequire(file)
    const edits = [], printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
    const add = (start, end, text, reason) => { edits.push({ start, end, text }); changes.push({ offset: offset + start, reason }) }
    const literal = (node, target, reason) => add(node.getStart(file) + 1, node.end - 1, target, reason)
    const note = (node, reason) => manual.push({ offset: offset + node.getStart(file), reason })
    const text = nodes => nodes.map(node => printer.printNode(ts.EmitHint.Unspecified, node, file)).join('\n')
    const module = value => factory.createStringLiteral(value)
    const legacyTarget = (request, kind) => {
      const match = /^(aheart-ui|@aheart-ui\/(?:ai|dnd))\/(es|lib)\/(.+)$/.exec(request)
      if (!match) return undefined
      const [, pkg, format, rest] = match
      if (['style.css', 'full.css'].includes(rest)) return `${pkg}/full.css`
      const entry = manifest[domains[pkg]].find(entry => rest === `${entry.subpath}/index.js` || rest === `${entry.subpath}/style.css`)
      if (!entry) return undefined
      if (rest.endsWith('/style.css')) return `${pkg}/${entry.subpath}/style.css`
      if ((kind === 'esm' && format === 'es') || (kind === 'require' && format === 'lib')) return `${pkg}/${entry.subpath}`
      return undefined
    }
    const hasDirective = node => /@ts-(?:ignore|expect-error)|eslint-(?:disable|enable)/.test(code.slice(node.getFullStart(), node.end))
    for (const node of file.statements) {
      if (!(ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) || !node.moduleSpecifier || !ts.isStringLiteral(node.moduleSpecifier)) continue
      const request = node.moduleSpecifier.text
      const legacy = legacyTarget(request, 'esm')
      if (legacy) { literal(node.moduleSpecifier, legacy, 'public path replaces equivalent legacy ESM/CSS path'); continue }
      if (/^(aheart-ui|@aheart-ui\/(?:ai|dnd))\/(es|lib)\//.test(request)) { note(node, 'No declared equivalent ESM/CSS path; review private or cross-format legacy access'); continue }
      if (!roots.has(request)) continue
      if (ts.isImportDeclaration(node)) {
        const clause = node.importClause
        if (!clause) continue
        const bindings = clause.namedBindings
        const named = bindings && ts.isNamedImports(bindings) ? [...bindings.elements] : []
        const moved = request === '@aheart-ui/ai' ? named.filter(item => importedName(item) === 'AIAgentWorkbench') : []
        const defaults = named.filter(item => importedName(item) === 'default')
        if (!clause.name && !moved.length && !defaults.length) continue
        if (clause.name && !bindings) { literal(node.moduleSpecifier, `${request}/full`, 'default Plugin moves to /full'); continue }
        if (!clause.name && defaults.length === named.length) { literal(node.moduleSpecifier, `${request}/full`, 'named default Plugin moves to /full'); continue }
        if (!clause.name && moved.length === named.length) { literal(node.moduleSpecifier, `${request}/agent-workbench`, 'Workbench moves to explicit entry'); continue }
        if (node.attributes || hasDirective(node)) { note(node, 'Mixed import with import attributes/type/lint directives requires review before splitting'); continue }
        const output = []
        if (clause.name || defaults.length) output.push(factory.createImportDeclaration(node.modifiers, factory.createImportClause(clause.isTypeOnly, clause.name, defaults.length ? factory.createNamedImports(defaults) : undefined), module(`${request}/full`)))
        if (moved.length) output.push(factory.createImportDeclaration(node.modifiers, factory.createImportClause(clause.isTypeOnly, undefined, factory.createNamedImports(moved)), module(`${request}/agent-workbench`)))
        const remaining = named.filter(item => !moved.includes(item) && !defaults.includes(item))
        const rest = bindings && ts.isNamespaceImport(bindings) ? bindings : remaining.length ? factory.createNamedImports(remaining) : undefined
        if (rest) output.push(factory.createImportDeclaration(node.modifiers, factory.createImportClause(clause.isTypeOnly, undefined, rest), module(request)))
        add(node.getStart(file), node.end, text(output), 'split legacy Plugin/Workbench from compatible named imports')
      } else {
        if (!node.exportClause || !ts.isNamedExports(node.exportClause)) { note(node, 'Review star/namespace re-export of a changing root module'); continue }
        const named = [...node.exportClause.elements]
        const full = named.filter(item => importedName(item) === 'default')
        const workbench = request === '@aheart-ui/ai' ? named.filter(item => importedName(item) === 'AIAgentWorkbench') : []
        if (!full.length && !workbench.length) continue
        const groups = [[`${request}/full`, full], [`${request}/agent-workbench`, workbench], [request, named.filter(item => !full.includes(item) && !workbench.includes(item))]].filter(([, list]) => list.length)
        if (groups.length === 1) { literal(node.moduleSpecifier, groups[0][0], 'move explicit re-export to stable entry'); continue }
        if (node.attributes || hasDirective(node)) { note(node, 'Mixed re-export with attributes/type/lint directives requires review'); continue }
        add(node.getStart(file), node.end, text(groups.map(([target, items]) => factory.createExportDeclaration(node.modifiers, node.isTypeOnly, factory.createNamedExports(items), module(target)))), 'split explicit Plugin/Workbench re-exports')
      }
    }
    const visit = node => {
      if (ts.isIdentifier(node) && !ts.isNamespaceImport(node.parent)) {
        const symbol = checker.getSymbolAtLocation(node), root = namespaces.get(symbol)
        if (root && !reviewed.has(symbol)) {
          const parent = node.parent
          const member = ts.isPropertyAccessExpression(parent) && parent.expression === node ? parent.name.text : ts.isElementAccessExpression(parent) && parent.expression === node && ts.isStringLiteral(parent.argumentExpression) ? parent.argumentExpression.text : ts.isQualifiedName(parent) && parent.left === node ? parent.right.text : undefined
          if (!member || member === 'default' || (root === '@aheart-ui/ai' && member === 'AIAgentWorkbench')) {
            reviewed.add(symbol)
            note(node, 'Review namespace .default/Workbench or escaping module access; namespace remains unchanged')
          }
        }
      }
      if (ts.isCallExpression(node) && node.arguments.length === 1 && ts.isStringLiteral(node.arguments[0])) {
        const argument = node.arguments[0], request = argument.text
        const callee = ts.isIdentifier(node.expression) ? checker.getSymbolAtLocation(node.expression) : undefined
        const isRequire = ts.isIdentifier(node.expression) && ((!callee && node.expression.text === 'require') || (callee && requireBindings.has(callee)))
        const dynamic = node.expression.kind === ts.SyntaxKind.ImportKeyword
        if (!isRequire && ts.isIdentifier(node.expression) && node.expression.text === 'require' && roots.has(request)) note(node, 'Shadowed require binding; no automatic module-path change')
        if (isRequire || dynamic) {
          const target = legacyTarget(request, isRequire ? 'require' : 'esm')
          if (target) literal(argument, target, 'equivalent public module path')
          else if (/^(aheart-ui|@aheart-ui\/(?:ai|dnd))\/(es|lib)\//.test(request)) note(node, 'No declared equivalent module path; review private or cross-format legacy access')
          else if (roots.has(request)) {
            let expression = node
            while (expression.parent && (ts.isParenthesizedExpression(expression.parent) || ts.isAwaitExpression(expression.parent))) expression = expression.parent
            const parent = expression.parent
            const member = parent && ts.isPropertyAccessExpression(parent) ? parent.name.text : parent && ts.isElementAccessExpression(parent) && ts.isStringLiteral(parent.argumentExpression) ? parent.argumentExpression.text : undefined
            const binding = node.parent && ts.isVariableDeclaration(node.parent) && ts.isObjectBindingPattern(node.parent.name) ? node.parent.name.elements.map(importedName) : []
            const selected = member ?? (binding.length === 1 ? binding[0] : undefined)
            if (selected === 'default') literal(argument, `${request}/full`, 'explicit default module access moves to /full')
            else if (request === '@aheart-ui/ai' && selected === 'AIAgentWorkbench') literal(argument, `${request}/agent-workbench`, 'explicit Workbench module access moves to scoped entry')
            else if (dynamic || !binding.length || binding.includes('default') || binding.includes('AIAgentWorkbench')) note(node, 'Review dynamic/module namespace usage; default/Workbench access could not be rewritten safely')
          }
        }
      }
      ts.forEachChild(node, visit)
    }
    visit(file)
    let output = code
    for (const edit of edits.sort((a, b) => b.start - a.start)) output = output.slice(0, edit.start) + edit.text + output.slice(edit.end)
    return output
  }
  let output = source
  if (fileName.endsWith('.vue')) {
    const { descriptor, errors } = parseVue(source, { filename: fileName })
    if (errors.length) manual.push({ offset: 0, reason: 'Vue SFC parse errors; no automatic edits' })
    else {
      const blocks = [descriptor.script, descriptor.scriptSetup].filter(block => block && !block.src).sort((a, b) => b.loc.start.offset - a.loc.start.offset)
      for (const block of blocks) output = output.slice(0, block.loc.start.offset) + transform(block.content, block.loc.start.offset) + output.slice(block.loc.end.offset)
    }
  } else output = transform(source)
  return { source: output, changed: output !== source, changes, manual }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const args = process.argv.slice(2), write = args.includes('--write'), check = args.includes('--check')
  const files = args.filter(arg => !arg.startsWith('--'))
  if (!files.length || (write && check) || args.some(arg => arg.startsWith('--') && !['--write', '--check', '--dry-run'].includes(arg))) {
    console.error('Usage: node scripts/codemods/aheart-v2.mjs [--dry-run|--check|--write] file.ts file.vue ...')
    process.exitCode = 2
  } else for (const file of files) {
    const input = readFileSync(file, 'utf8'), result = migrateSource(input, file)
    if (write && result.changed) writeFileSync(file, result.source)
    console.log(JSON.stringify({ file, changed: result.changed, wrote: write && result.changed, changes: result.changes, manual: result.manual }))
    if (!write && !check && result.changed) console.log(result.source)
    if (check && (result.changed || result.manual.length)) process.exitCode = 1
  }
}
