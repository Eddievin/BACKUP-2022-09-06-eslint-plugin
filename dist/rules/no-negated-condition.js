"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noNegatedCondition = void 0;
const tslib_1 = require("tslib");
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
const utils = tslib_1.__importStar(require("./utils"));
exports.noNegatedCondition = utils.createRule({
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
    isRuleOptions: functions_1.is.object,
    messages: { noNegatedCondition: "Negated condition is not allowed" },
    name: "no-negated-condition"
});
//# sourceMappingURL=no-negated-condition.js.map