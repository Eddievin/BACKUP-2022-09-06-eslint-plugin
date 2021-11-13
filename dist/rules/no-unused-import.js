"use strict";
const tslib_1 = require("tslib");
const experimental_utils_1 = require("@typescript-eslint/experimental-utils");
const assert = (0, tslib_1.__importStar)(require("@typerock/functions/dist/assertions"));
const is = (0, tslib_1.__importStar)(require("@typerock/functions/dist/guards"));
const utils = (0, tslib_1.__importStar)(require("./utils"));
const rule = utils.createRule({
    create(context) {
        const identifiers = new Set();
        const importDeclarations = [];
        return {
            [experimental_utils_1.AST_NODE_TYPES.ImportDeclaration](node) {
                importDeclarations.push(node);
            },
            ":not(ImportDefaultSpecifier,ImportNamespaceSpecifier,ImportSpecifier,Property) > Identifier:not(.property)"(node) {
                identifiers.add(node.name);
            },
            "Program:exit"() {
                for (const node of importDeclarations) {
                    const specifiers = node.specifiers
                        .filter(used)
                        .map(specifier => {
                        switch (specifier.type) {
                            case experimental_utils_1.AST_NODE_TYPES.ImportDefaultSpecifier:
                                return specifier.local.name;
                            case experimental_utils_1.AST_NODE_TYPES.ImportNamespaceSpecifier:
                                return `* as ${specifier.local.name}`;
                            case experimental_utils_1.AST_NODE_TYPES.ImportSpecifier:
                                return specifier.imported.name === specifier.local.name
                                    ? `{ ${specifier.imported.name} }`
                                    : `{ ${specifier.imported.name} as ${specifier.local.name} }`;
                        }
                    })
                        .join(", ")
                        .replace(/ \}, \{ /gu, ", ");
                    const source = node.source.value;
                    assert.string(source);
                    if (node.specifiers.every(used)) {
                        // Valid
                    }
                    else if (node.specifiers.some(used))
                        context.report({
                            fix() {
                                return [
                                    {
                                        range: node.range,
                                        text: `import ${specifiers} from "${source}";`
                                    }
                                ];
                            },
                            messageId: "unusedImport",
                            node
                        });
                    else
                        context.report({
                            fix() {
                                return [
                                    {
                                        range: context.getRangeWithLeadingTrivia(node),
                                        text: ""
                                    }
                                ];
                            },
                            messageId: "unusedImport",
                            node
                        });
                }
                function used(specifier) {
                    return identifiers.has(specifier.local.name);
                }
            },
            "Property > Identifier.value"(node) {
                identifiers.add(node.name);
            }
        };
    },
    fixable: "code",
    isRuleOptions: is.object,
    messages: {
        unusedImport: "Unused import"
    }
});
module.exports = rule;
//# sourceMappingURL=no-unused-import.js.map