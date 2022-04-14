"use strict";
const tslib_1 = require("tslib");
const is = tslib_1.__importStar(require("@skylib/functions/dist/guards"));
const utils_1 = require("@typescript-eslint/utils");
const utils = tslib_1.__importStar(require("./utils"));
const rule = utils.createRule({
    create(context) {
        return {
            [utils_1.AST_NODE_TYPES.PropertyDefinition](node) {
                if (node.typeAnnotation || node.value) {
                    // Valid
                }
                else
                    context.report({ messageId: "typedefRequired", node });
            }
        };
    },
    isRuleOptions: is.object,
    messages: { typedefRequired: "Type definition required" },
    name: "class-member-typedef"
});
module.exports = rule;
//# sourceMappingURL=class-member-typedef.js.map