"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlyExportName = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const functions_1 = require("@skylib/functions");
const _ = tslib_1.__importStar(require("@skylib/lodash-commonjs-es"));
const utils = tslib_1.__importStar(require("./utils"));
exports.onlyExportName = utils.createRule({
    create(context) {
        let hasDefaultExport = false;
        const nodes = new Set();
        return {
            "Program > ExportDefaultDeclaration"() {
                hasDefaultExport = true;
            },
            "Program > ExportNamedDeclaration > ClassDeclaration > Identifier"(node) {
                nodes.add(node);
            },
            "Program > ExportNamedDeclaration > FunctionDeclaration > Identifier"(node) {
                nodes.add(node);
            },
            "Program > ExportNamedDeclaration > TSInterfaceDeclaration > Identifier"(node) {
                nodes.add(node);
            },
            "Program > ExportNamedDeclaration > TSTypeAliasDeclaration > Identifier"(node) {
                nodes.add(node);
            },
            "Program > ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > Identifier"(node) {
                nodes.add(node);
            },
            "Program:exit"() {
                if (hasDefaultExport || nodes.size > 1) {
                    // Valid
                }
                else
                    for (const node of nodes)
                        if (node.name === _.camelCase(path_1.default.parse(context.path).name)) {
                            // Valid
                        }
                        else
                            context.report({ messageId: "invalidName", node });
            }
        };
    },
    isRuleOptions: functions_1.is.object,
    messages: { invalidName: "Only export should match file name" },
    name: "only-export-name"
});
//# sourceMappingURL=only-export-name.js.map