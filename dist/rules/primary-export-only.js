"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.primaryExportOnly = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const functions_1 = require("@skylib/functions");
const utils = tslib_1.__importStar(require("./utils"));
exports.primaryExportOnly = utils.createRule({
    create(context) {
        const exportDefaultDeclarations = new Set();
        const identifiers = new Set();
        return {
            "Program > ExportDefaultDeclaration"(node) {
                exportDefaultDeclarations.add(node);
            },
            "Program > ExportNamedDeclaration > ClassDeclaration > Identifier"(node) {
                identifiers.add(node);
            },
            "Program > ExportNamedDeclaration > FunctionDeclaration > Identifier"(node) {
                identifiers.add(node);
            },
            "Program > ExportNamedDeclaration > TSInterfaceDeclaration > Identifier"(node) {
                identifiers.add(node);
            },
            "Program > ExportNamedDeclaration > TSTypeAliasDeclaration > Identifier"(node) {
                identifiers.add(node);
            },
            "Program > ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > Identifier"(node) {
                identifiers.add(node);
            },
            "Program:exit"() {
                if (functions_1.a
                    .fromIterable(identifiers.values())
                    .some(node => node.name === path_1.default.parse(context.path).name)) {
                    for (const node of exportDefaultDeclarations)
                        context.report({ messageId: "invalidExport", node });
                    for (const node of identifiers)
                        if (node.name === path_1.default.parse(context.path).name) {
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