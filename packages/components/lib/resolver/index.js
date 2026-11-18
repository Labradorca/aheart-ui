"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const constant_index = require("../constant/index.js");
const diagnostics = require("./diagnostics.js");
function AheartUIResolver({ domains = ["base"], importStyle = false } = {}) {
  const enabled = new Set(domains);
  const entries = new Map(constant_index.aheartComponentEntries.filter(({ domain }) => enabled.has(domain)).map((entry) => [`A${entry.name}`, entry]));
  return (componentName) => {
    const entry = entries.get(componentName);
    if (!entry)
      return void 0;
    return {
      name: entry.name,
      from: entry.from,
      ...importStyle === "css" ? { sideEffects: [...entry.styles] } : {}
    };
  };
}
exports.AheartV2DeprecationDiagnostics = diagnostics.AheartV2DeprecationDiagnostics;
exports.AheartUIResolver = AheartUIResolver;
