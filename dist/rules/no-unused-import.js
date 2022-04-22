"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noUnusedImport = void 0;
const tslib_1 = require("tslib");
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
const utils = tslib_1.__importStar(require("./utils"));
exports.noUnusedImport = utils.createRule({
    create(context) {
        const identifiers = new Set();
        const importDeclarations = [];
        return {
            [utils_1.AST_NODE_TYPES.ImportDeclaration](node) {
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
                            case utils_1.AST_NODE_TYPES.ImportDefaultSpecifier:
                                return specifier.local.name;
                            case utils_1.AST_NODE_TYPES.ImportNamespaceSpecifier:
                                return `* as ${specifier.local.name}`;
                            case utils_1.AST_NODE_TYPES.ImportSpecifier:
                                return specifier.imported.name === specifier.local.name
                                    ? `{ ${specifier.imported.name} }`
                                    : `{ ${specifier.imported.name} as ${specifier.local.name} }`;
                        }
                    })
                        .join(", ")
                        .replace(/ \}, \{ /gu, ", ");
                    const source = node.source.value;
                    functions_1.assert.string(source);
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
                                return context.hasLeadingComment(node)
                                    ? []
                                    : [
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
    isRuleOptions: functions_1.is.object,
    messages: { unusedImport: "Unused import" },
    name: "no-unused-import"
});
//# sourceMappingURL=no-unused-import.js.map