"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vueComponentName = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
const _ = tslib_1.__importStar(require("@skylib/lodash-commonjs-es"));
const utils_1 = require("@typescript-eslint/utils");
const path_1 = tslib_1.__importDefault(require("path"));
exports.vueComponentName = utils.createRule({
    create: context => {
        const { prefix, suffix } = context.options;
        return {
            [utils_1.AST_NODE_TYPES.CallExpression]: (node) => {
                if (node.callee.type === utils_1.AST_NODE_TYPES.Identifier &&
                    node.callee.name === "defineComponent") {
                    const argument = node.arguments[0];
                    if (argument && argument.type === utils_1.AST_NODE_TYPES.ObjectExpression)
                        for (const property of argument.properties)
                            if (property.type === utils_1.AST_NODE_TYPES.Property &&
                                property.key.type === utils_1.AST_NODE_TYPES.Identifier &&
                                property.key.name === "name" &&
                                property.value.type === utils_1.AST_NODE_TYPES.Literal)
                                if (property.value.value ===
                                    prefix + _.kebabCase(path_1.default.parse(context.path).name) + suffix) {
                                    // Valid
                                }
                                else
                                    context.report({
                                        messageId: "invalidName",
                                        node: property.value
                                    });
                }
            }
        };
    },
    defaultOptions: { prefix: "", suffix: "" },
    isRuleOptions: functions_1.is.object.factory({ prefix: functions_1.is.string, suffix: functions_1.is.string }, {}),
    messages: { invalidName: "Export name should match file name" },
    name: "vue-component-name"
});
//# sourceMappingURL=vue-component-name.js.map