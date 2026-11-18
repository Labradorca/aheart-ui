interface AstNode {
  type: string
  start?: number
  name?: string
  value?: unknown
  [key: string]: unknown
}

interface DiagnosticContext {
  parse(code: string): unknown
  warn(message: string, position?: number): void
}

const node = (value: unknown): AstNode | undefined => value && typeof value === 'object' && typeof (value as AstNode).type === 'string' ? value as AstNode : undefined
const nodes = (value: unknown): AstNode[] => Array.isArray(value) ? value.map(node).filter((item): item is AstNode => Boolean(item)) : []
const name = (value: unknown) => { const item = node(value); return item?.name ?? (typeof item?.value === 'string' ? item.value : undefined) }
const request = (value: unknown) => { const item = node(value); return typeof item?.value === 'string' ? item.value : undefined }
const functions = new Set(['FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression'])

function bindings(value: unknown): string[] {
  const item = node(value)
  if (!item) return []
  if (item.type === 'Identifier') return item.name ? [item.name] : []
  if (item.type === 'Property') return bindings(item.value)
  if (item.type === 'RestElement') return bindings(item.argument)
  if (item.type === 'AssignmentPattern') return bindings(item.left)
  return [...nodes(item.properties), ...nodes(item.elements)].flatMap(bindings)
}

function blockBindings(item: AstNode): string[] {
  return nodes(item.body).flatMap(statement => {
    if (statement.type === 'VariableDeclaration') return nodes(statement.declarations).flatMap(declaration => bindings(declaration.id))
    if (statement.type === 'FunctionDeclaration' || statement.type === 'ClassDeclaration') return bindings(statement.id)
    return []
  })
}

function functionVars(item: AstNode): string[] {
  const found: string[] = []
  const visit = (value: unknown) => {
    const child = node(value)
    if (!child || functions.has(child.type)) return
    if (child.type === 'VariableDeclaration' && child.kind === 'var') found.push(...nodes(child.declarations).flatMap(declaration => bindings(declaration.id)))
    for (const value of Object.values(child)) if (Array.isArray(value)) value.forEach(visit); else visit(value)
  }
  visit(item.body)
  return found
}

/** Vite development import diagnostics; component/Plugin objects stay untouched. */
export function AheartV2DeprecationDiagnostics() {
  let enabled = false
  const emitted = new Set<string>()
  return {
    name: 'aheart-v2-deprecations',
    enforce: 'post' as const,
    apply(_config: unknown, environment: { command: string; mode: string }) {
      enabled = environment.command === 'serve' && environment.mode !== 'production'
      return enabled
    },
    buildStart() { emitted.clear() },
    transform(this: DiagnosticContext, code: string, id: string) {
      if (!enabled || !/\.(?:[cm]?[jt]sx?|vue)(?:\?|$)/.test(id) || /[?&]type=style(?:&|$)/.test(id)) return null
      let ast: AstNode | undefined
      try { ast = node(this.parse(code)) } catch { return null }
      if (!ast) return null
      const namespaces = new Map<string, string>()
      const warn = (kind: 'B1' | 'B3', item: AstNode) => {
        const key = `${id.split('?')[0]}:${kind}`
        if (emitted.has(key)) return
        emitted.add(key)
        this.warn(kind === 'B1'
          ? '[AheartUI B1] v2 removes the aheart-ui root default Plugin. Import the Plugin from aheart-ui/full; root named components/types remain supported.'
          : '[AheartUI B3] v2 removes Workbench from the AI root and its Plugin. Use @aheart-ui/ai/agent-workbench, or @aheart-ui/ai/full for the full Plugin; install DND explicitly in v2.', item.start)
      }
      const changed = (source: string | undefined, member: string | undefined, item: AstNode) => {
        if (source === 'aheart-ui' && member === 'default') warn('B1', item)
        if (source === '@aheart-ui/ai' && (member === 'default' || member === 'AIAgentWorkbench')) warn('B3', item)
      }
      for (const statement of nodes(ast.body)) {
        const source = request(statement.source)
        if (statement.type === 'ImportDeclaration') for (const specifier of nodes(statement.specifiers)) {
          if (specifier.type === 'ImportNamespaceSpecifier') {
            const local = name(specifier.local)
            if (local && source) namespaces.set(local, source)
          } else changed(source, specifier.type === 'ImportDefaultSpecifier' ? 'default' : name(specifier.imported), specifier)
        }
        if (statement.type === 'ExportNamedDeclaration') for (const specifier of nodes(statement.specifiers)) changed(source, name(specifier.local), specifier)
        if (statement.type === 'ExportAllDeclaration' && source === '@aheart-ui/ai') warn('B3', statement)
      }
      const moduleSource = (value: unknown, shadowed: Set<string>): string | undefined => {
        const item = node(value)
        if (!item) return undefined
        if (item.type === 'Identifier' && item.name && !shadowed.has(item.name)) return namespaces.get(item.name)
        if (item.type === 'AwaitExpression' || item.type === 'ChainExpression' || item.type === 'ParenthesizedExpression') return moduleSource(item.argument ?? item.expression, shadowed)
        if (item.type === 'ImportExpression') return request(item.source)
        if (item.type === 'CallExpression' && name(item.callee) === 'require' && !shadowed.has('require')) return request(nodes(item.arguments)[0])
        return undefined
      }
      const walk = (item: AstNode, inherited: Set<string>) => {
        const shadowed = new Set(inherited)
        if (functions.has(item.type)) [...nodes(item.params).flatMap(bindings), ...bindings(item.id), ...functionVars(item)].forEach(value => shadowed.add(value))
        if (item.type === 'ClassExpression' || item.type === 'ClassDeclaration') bindings(item.id).forEach(value => shadowed.add(value))
        if (item.type === 'Program' || item.type === 'BlockStatement') blockBindings(item).forEach(value => shadowed.add(value))
        if (item.type === 'CatchClause') bindings(item.param).forEach(value => shadowed.add(value))
        for (const declaration of [node(item.init), node(item.left)]) if (declaration?.type === 'VariableDeclaration') nodes(declaration.declarations).flatMap(value => bindings(value.id)).forEach(value => shadowed.add(value))
        if (item.type === 'SwitchStatement') {
          const discriminant = node(item.discriminant)
          if (discriminant) walk(discriminant, shadowed)
          const cases = nodes(item.cases), lexical = new Set(shadowed)
          blockBindings({ type: 'BlockStatement', body: cases.flatMap(value => nodes(value.consequent)) }).forEach(value => lexical.add(value))
          cases.forEach(value => walk(value, lexical))
          return
        }
        if (item.type === 'MemberExpression') {
          const property = item.computed ? request(item.property) : name(item.property)
          changed(moduleSource(item.object, shadowed), property, item)
        }
        for (const value of Object.values(item)) if (Array.isArray(value)) nodes(value).forEach(child => walk(child, shadowed)); else { const child = node(value); if (child) walk(child, shadowed) }
      }
      walk(ast, new Set())
      return null
    }
  }
}
