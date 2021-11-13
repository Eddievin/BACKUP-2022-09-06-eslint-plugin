"use strict";
const tslib_1 = require("tslib");
const experimental_utils_1 = require("@typescript-eslint/experimental-utils");
const is = (0, tslib_1.__importStar)(require("@typerock/functions/dist/guards"));
const utils = (0, tslib_1.__importStar)(require("./utils"));
const rule = utils.createRule({
    create(context) {
        return {
            [experimental_utils_1.AST_NODE_TYPES.PropertyDefinition](node) {
                if (node.typeAnnotation || node.value) {
                    // Valid
                }
                else
                    context.report({ messageId: "typedefRequired", node });
            }
        };
    },
    isRuleOptions: is.object,
    messages: {
        typedefRequired: "Type definition required"
    }
});
module.exports = rule;
//# sourceMappingURL=class-member-typedef.js.map