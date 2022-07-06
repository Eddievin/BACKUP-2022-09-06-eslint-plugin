import * as utils from "./utils";
import { is } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";

export const noNegatedCondition = utils.createRule({
  create: (context): RuleListener => {
    return {
      [AST_NODE_TYPES.IfStatement]: (node): void => {
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
