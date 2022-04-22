"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportAllName = void 0;
const tslib_1 = require("tslib");
const functions_1 = require("@skylib/functions");
const _ = tslib_1.__importStar(require("@skylib/lodash-commonjs-es"));
const utils_1 = require("@typescript-eslint/utils");
const utils = tslib_1.__importStar(require("./utils"));
exports.exportAllName = utils.createRule({
    create(context) {
        return {
            [utils_1.AST_NODE_TYPES.ExportAllDeclaration](node) {
                if (node.exported && node.source)
                    if (node.exported.name === _.camelCase(node.source.value)) {
                        // Valid
                    }
                    else
                        context.report({ messageId: "invalidName", node });
            }
        };
    },
    isRuleOptions: functions_1.is.object,
    messages: { invalidName: "Export name should match file name" },
    name: "export-all-name"
});
//# sourceMappingURL=export-all-name.js.map