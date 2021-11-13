const types1 = Object.values(
  require("@typescript-eslint/experimental-utils").AST_NODE_TYPES
);

const types2 = (() => {
  const fs = require("fs");

  const tsMorph = require("ts-morph");

  const path = require.resolve("@typescript-eslint/types/dist/ast-spec.d.ts");

  const code = fs.readFileSync(path).toString();

  const project = new tsMorph.Project({ useInMemoryFileSystem: true });

  const file = project.createSourceFile("main.ts", code);

  return file.getExportedDeclarations().keys();
})();

module.exports = {
  readonlyIgnoreTypes: [
    ...types1,
    ...types2,
    "InvalidTestCase",
    "MappedTypeNode",
    "ObjectType",
    "Position",
    "PropertyDefinitionComputedName",
    "PropertyDefinitionNonComputedName",
    "ReportDescriptorLocOnly",
    "RuleContext",
    "RuleListener",
    "RuleModule",
    "Signature",
    "TSAbstractPropertyDefinitionComputedName",
    "TSAbstractPropertyDefinitionNonComputedName",
    "Type",
    "TypeChecker",
    "TypeParameter",
    "ValidTestCase"
  ],
  utility: true
};
