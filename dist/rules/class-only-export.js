"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classOnlyExport = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
exports.classOnlyExport = utils.createRule({
    create(context) {
        const exportAllDeclarations = [];
        const exportDefaultDeclaration = [];
        const identifiers = [];
        let className;
        return {
            "Program > ExportAllDeclaration"(node) {
                if (functions_1.is.empty(node.exported))
                    exportAllDeclarations.push(node);
            },
            "Program > ExportAllDeclaration > Identifier"(node) {
                identifiers.push(node);
            },
            "Program > ExportDefaultDeclaration"(node) {
                if (node.declaration.type === utils_1.AST_NODE_TYPES.ClassDeclaration &&
                    node.declaration.id)
                    className = node.declaration.id.name;
                else
                    exportDefaultDeclaration.push(node);
            },
            "Program > ExportNamedDeclaration > ClassDeclaration > Identifier.id"(node) {
                className = node.name;
            },
            "Program > ExportNamedDeclaration > ExportSpecifier > Identifier.exported"(node) {
                identifiers.push(node);
            },
            "Program > ExportNamedDeclaration > FunctionDeclaration > Identifier.id"(node) {
                identifiers.push(node);
            },
            "Program > ExportNamedDeclaration > TSInterfaceDeclaration > Identifier.id"(node) {
                identifiers.push(node);
            },
            "Program > ExportNamedDeclaration > TSModuleDeclaration > Identifier.id"(node) {
                identifiers.push(node);
            },
            "Program > ExportNamedDeclaration > TSTypeAliasDeclaration > Identifier.id"(node) {
                identifiers.push(node);
            },
            "Program > ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > Identifier.id"(node) {
                identifiers.push(node);
            },
            "Program:exit"() {
                if (functions_1.is.not.empty(className)) {
                    const nodes = [
                        ...exportAllDeclarations,
                        ...exportDefaultDeclaration,
                        ...identifiers.filter(node => node.name !== className)
                    ];
                    if (nodes.length)
                        for (const node of nodes)
                            context.report({ messageId: "exportNotAllowed", node });
                }
            }
        };
    },
    isRuleOptions: functions_1.is.object,
    messages: { exportNotAllowed: "Export except class is not allowed" },
    name: "class-only-export"
});
//# sourceMappingURL=class-only-export.js.map