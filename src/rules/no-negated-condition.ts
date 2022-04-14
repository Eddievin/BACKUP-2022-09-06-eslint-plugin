import * as is from "@skylib/functions/dist/guards";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import * as utils from "./utils";

const rule = utils.createRule({
  create(context) {
    return {
      [AST_NODE_TYPES.IfStatement](node): void {
        if (
          node.test.type === AST_NODE_TYPES.UnaryExpression &&
          node.test.operator === "!"
        )
          context.report({ messageId: "noNegatedCondition", node });

        if (
          node.test.type === AST_NODE_TYPES.BinaryExpression &&
          node.test.operator === "!=="
        )
          context.report({ messageId: "noNegatedCondition", node });
      }
    };
  },
  isRuleOptions: is.object,
  messages: { noNegatedCondition: "Negated condition is not allowed" },
  name: "no-negated-condition"
});

export = rule;
