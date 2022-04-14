"use strict";
const tslib_1 = require("tslib");
const is = tslib_1.__importStar(require("@skylib/functions/dist/guards"));
const utils_1 = require("@typescript-eslint/utils");
const utils = tslib_1.__importStar(require("./utils"));
const rule = utils.createRule({
    create(context) {
        return {
            [utils_1.AST_NODE_TYPES.IfStatement](node) {
                if (node.test.type === utils_1.AST_NODE_TYPES.UnaryExpression &&
                    node.test.operator === "!")
                    context.report({ messageId: "noNegatedCondition", node });
                if (node.test.type === utils_1.AST_NODE_TYPES.BinaryExpression &&
                    node.test.operator === "!==")
                    context.report({ messageId: "noNegatedCondition", node });
            }
        };
    },
    isRuleOptions: is.object,
    messages: { noNegatedCondition: "Negated condition is not allowed" },
    name: "no-negated-condition"
});
module.exports = rule;
//# sourceMappingURL=no-negated-condition.js.map