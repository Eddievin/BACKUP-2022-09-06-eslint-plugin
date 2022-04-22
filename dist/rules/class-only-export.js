"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classOnlyExport = void 0;
const tslib_1 = require("tslib");
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
const utils = tslib_1.__importStar(require("./utils"));
exports.classOnlyExport = utils.createRule({
    create(context) {
        const nodes = new Set();
        let hasClassExport = false;
        return {
            "Program > ExportAllDeclaration"(node) {
                nodes.add(node);
            },
            "Program > ExportDefaultDeclaration"(node) {
                if (node.declaration.type === utils_1.AST_NODE_TYPES.ClassDeclaration)
                    hasClassExport = true;
                else
                    nodes.add(node);
            },
            "Program > ExportNamedDeclaration"(node) {
                var _a;
                if (((_a = node.declaration) === null || _a === void 0 ? void 0 : _a.type) === utils_1.AST_NODE_TYPES.ClassDeclaration)
                    hasClassExport = true;
                else
                    nodes.add(node);
            },
            "Program:exit"() {
                if (hasClassExport && nodes.size > 0)
                    for (const node of nodes)
                        context.report({ messageId: "exportNotAllowed", node });
            }
        };
    },
    isRuleOptions: functions_1.is.object,
    messages: { exportNotAllowed: "Export except class is not allowed" },
    name: "class-only-export"
});
//# sourceMappingURL=class-only-export.js.map