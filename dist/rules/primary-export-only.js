"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.primaryExportOnly = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
const _ = tslib_1.__importStar(require("@skylib/lodash-commonjs-es"));
const node_path_1 = tslib_1.__importDefault(require("node:path"));
exports.primaryExportOnly = utils.createRule({
    create: (context) => {
        const exportDefaultDeclarations = new Set();
        const identifiers = new Set();
        return {
            "Program > ExportDefaultDeclaration": (node) => {
                exportDefaultDeclarations.add(node);
            },
            "Program > ExportNamedDeclaration > ClassDeclaration > Identifier.id": (node) => {
                identifiers.add(node);
            },
            "Program > ExportNamedDeclaration > ExportSpecifier > Identifier.exported": (node) => {
                identifiers.add(node);
            },
            "Program > ExportNamedDeclaration > FunctionDeclaration > Identifier.id": (node) => {
                identifiers.add(node);
            },
            "Program > ExportNamedDeclaration > TSInterfaceDeclaration > Identifier.id": (node) => {
                identifiers.add(node);
            },
            "Program > ExportNamedDeclaration > TSModuleDeclaration > Identifier.id": (node) => {
                identifiers.add(node);
            },
            "Program > ExportNamedDeclaration > TSTypeAliasDeclaration > Identifier.id": (node) => {
                identifiers.add(node);
            },
            "Program > ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > Identifier.id": (node) => {
                identifiers.add(node);
            },
            "Program:exit": () => {
                const primary = functions_1.a
                    .fromIterable(identifiers.values())
                    .find(node => _.kebabCase(node.name) ===
                    _.kebabCase(node_path_1.default.parse(context.path).name));
                if (primary) {
                    for (const node of exportDefaultDeclarations)
                        context.report({ messageId: "invalidExport", node });
                    for (const node of identifiers)
                        if (node.name === primary.name) {
                            // Valid
                        }
                        else
                            context.report({ messageId: "invalidExport", node });
                }
            }
        };
    },
    isRuleOptions: functions_1.is.object,
    messages: {
        invalidExport: "Additional export is not allowed when there is export matching file name"
    },
    name: "primary-export-only"
});
//# sourceMappingURL=primary-export-only.js.map