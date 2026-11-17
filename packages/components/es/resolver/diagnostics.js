const node = (value) => value && typeof value === "object" && typeof value.type === "string" ? value : void 0;
const nodes = (value) => Array.isArray(value) ? value.map(node).filter((item) => Boolean(item)) : [];
const name = (value) => {
  const item = node(value);
  return (item == null ? void 0 : item.name) ?? (typeof (item == null ? void 0 : item.value) === "string" ? item.value : void 0);
};
const request = (value) => {
  const item = node(value);
  return typeof (item == null ? void 0 : item.value) === "string" ? item.value : void 0;
};
const functions = /* @__PURE__ */ new Set(["FunctionDeclaration", "FunctionExpression", "ArrowFunctionExpression"]);
function bindings(value) {
  const item = node(value);
  if (!item)
    return [];
  if (item.type === "Identifier")
    return item.name ? [item.name] : [];
  if (item.type === "Property")
    return bindings(item.value);
  if (item.type === "RestElement")
    return bindings(item.argument);
  if (item.type === "AssignmentPattern")
    return bindings(item.left);
  return [...nodes(item.properties), ...nodes(item.elements)].flatMap(bindings);
}
function blockBindings(item) {
  return nodes(item.body).flatMap((statement) => {
    if (statement.type === "VariableDeclaration")
      return nodes(statement.declarations).flatMap((declaration) => bindings(declaration.id));
    if (statement.type === "FunctionDeclaration" || statement.type === "ClassDeclaration")
      return bindings(statement.id);
    return [];
  });
}
function functionVars(item) {
  const found = [];
  const visit = (value) => {
    const child = node(value);
    if (!child || functions.has(child.type))
      return;
    if (child.type === "VariableDeclaration" && child.kind === "var")
      found.push(...nodes(child.declarations).flatMap((declaration) => bindings(declaration.id)));
    for (const value2 of Object.values(child))
      if (Array.isArray(value2))
        value2.forEach(visit);
      else
        visit(value2);
  };
  visit(item.body);
  return found;
}
function AheartV2DeprecationDiagnostics() {
  let enabled = false;
  const emitted = /* @__PURE__ */ new Set();
  return {
    name: "aheart-v2-deprecations",
    enforce: "post",
    apply(_config, environment) {
      enabled = environment.command === "serve" && environment.mode !== "production";
      return enabled;
    },
    buildStart() {
      emitted.clear();
    },
    transform(code, id) {
      if (!enabled || !/\.(?:[cm]?[jt]sx?|vue)(?:\?|$)/.test(id) || /[?&]type=style(?:&|$)/.test(id))
        return null;
      let ast;
      try {
        ast = node(this.parse(code));
      } catch {
        return null;
      }
      if (!ast)
        return null;
      const namespaces = /* @__PURE__ */ new Map();
      const warn = (kind, item) => {
        const key = `${id.split("?")[0]}:${kind}`;
        if (emitted.has(key))
          return;
        emitted.add(key);
        this.warn(kind === "B1" ? "[AheartUI B1] v2 removes the aheart-ui root default Plugin. Import the Plugin from aheart-ui/full; root named components/types remain supported." : "[AheartUI B3] v2 removes Workbench from the AI root and its Plugin. Use @aheart-ui/ai/agent-workbench, or @aheart-ui/ai/full for the full Plugin; install DND explicitly in v2.", item.start);
      };
      const changed = (source, member, item) => {
        if (source === "aheart-ui" && member === "default")
          warn("B1", item);
        if (source === "@aheart-ui/ai" && (member === "default" || member === "AIAgentWorkbench"))
          warn("B3", item);
      };
      for (const statement of nodes(ast.body)) {
        const source = request(statement.source);
        if (statement.type === "ImportDeclaration")
          for (const specifier of nodes(statement.specifiers)) {
            if (specifier.type === "ImportNamespaceSpecifier") {
              const local = name(specifier.local);
              if (local && source)
                namespaces.set(local, source);
            } else
              changed(source, specifier.type === "ImportDefaultSpecifier" ? "default" : name(specifier.imported), specifier);
          }
        if (statement.type === "ExportNamedDeclaration")
          for (const specifier of nodes(statement.specifiers))
            changed(source, name(specifier.local), specifier);
        if (statement.type === "ExportAllDeclaration" && source === "@aheart-ui/ai")
          warn("B3", statement);
      }
      const moduleSource = (value, shadowed) => {
        const item = node(value);
        if (!item)
          return void 0;
        if (item.type === "Identifier" && item.name && !shadowed.has(item.name))
          return namespaces.get(item.name);
        if (item.type === "AwaitExpression" || item.type === "ChainExpression" || item.type === "ParenthesizedExpression")
          return moduleSource(item.argument ?? item.expression, shadowed);
        if (item.type === "ImportExpression")
          return request(item.source);
        if (item.type === "CallExpression" && name(item.callee) === "require" && !shadowed.has("require"))
          return request(nodes(item.arguments)[0]);
        return void 0;
      };
      const walk = (item, inherited) => {
        const shadowed = new Set(inherited);
        if (functions.has(item.type))
          [...nodes(item.params).flatMap(bindings), ...bindings(item.id), ...functionVars(item)].forEach((value) => shadowed.add(value));
        if (item.type === "ClassExpression" || item.type === "ClassDeclaration")
          bindings(item.id).forEach((value) => shadowed.add(value));
        if (item.type === "Program" || item.type === "BlockStatement")
          blockBindings(item).forEach((value) => shadowed.add(value));
        if (item.type === "CatchClause")
          bindings(item.param).forEach((value) => shadowed.add(value));
        for (const declaration of [node(item.init), node(item.left)])
          if ((declaration == null ? void 0 : declaration.type) === "VariableDeclaration")
            nodes(declaration.declarations).flatMap((value) => bindings(value.id)).forEach((value) => shadowed.add(value));
        if (item.type === "SwitchStatement") {
          const discriminant = node(item.discriminant);
          if (discriminant)
            walk(discriminant, shadowed);
          const cases = nodes(item.cases), lexical = new Set(shadowed);
          blockBindings({ type: "BlockStatement", body: cases.flatMap((value) => nodes(value.consequent)) }).forEach((value) => lexical.add(value));
          cases.forEach((value) => walk(value, lexical));
          return;
        }
        if (item.type === "MemberExpression") {
          const property = item.computed ? request(item.property) : name(item.property);
          changed(moduleSource(item.object, shadowed), property, item);
        }
        for (const value of Object.values(item))
          if (Array.isArray(value))
            nodes(value).forEach((child) => walk(child, shadowed));
          else {
            const child = node(value);
            if (child)
              walk(child, shadowed);
          }
      };
      walk(ast, /* @__PURE__ */ new Set());
      return null;
    }
  };
}
export {
  AheartV2DeprecationDiagnostics
};
