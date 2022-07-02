"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlyExportName = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
exports.onlyExportName = utils.createRule({
    create: context => {
        let hasDefaultExport = false;
        const nodes = new Set();
        return {
            "Program > ExportDefaultDeclaration": () => {
                hasDefaultExport = true;
            },
            "Program > ExportNamedDeclaration > ClassDeclaration > Identifier.id": (node) => {
                nodes.add(node);
            },
            "Program > ExportNamedDeclaration > ExportSpecifier > Identifier.exported": (node) => {
                nodes.add(node);
            },
            "Program > ExportNamedDeclaration > FunctionDeclaration > Identifier.id": (node) => {
                nodes.add(node);
            },
            "Program > ExportNamedDeclaration > TSInterfaceDeclaration > Identifier.id": (node) => {
                nodes.add(node);
            },
            "Program > ExportNamedDeclaration > TSModuleDeclaration > Identifier.id": (node) => {
                nodes.add(node);
            },
            "Program > ExportNamedDeclaration > TSTypeAliasDeclaration > Identifier.id": (node) => {
                nodes.add(node);
            },
            "Program > ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > Identifier.id": (node) => {
                nodes.add(node);
            },
            "Program:exit": () => {
                if (hasDefaultExport || nodes.size > 1) {
                    // Valid
                }
                else
                    for (const node of nodes) {
                        const expected = utils.getNameFromFilename(context.path, node.name);
                        if (node.name === "default" || node.name === expected) {
                            // Valid
                        }
                        else
                            context.report({ messageId: "invalidName", node });
                    }
            }
        };
    },
    isRuleOptions: functions_1.is.object,
    messages: { invalidName: "Only export should match file name" },
    name: "only-export-name"
});
//# sourceMappingURL=only-export-name.js.map