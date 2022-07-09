import * as utils from "./utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import { is } from "@skylib/functions";

export const noNegatedCondition = utils.createRule({
  name: "no-negated-condition",
  isOptions: is.object,
  messages: { noNegatedCondition: "Negated condition is not allowed" },
  create: (context): RuleListener => ({
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
  })
});
