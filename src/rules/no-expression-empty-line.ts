import * as utils from "./utils";
import { a, evaluate, is, s } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type {
  RuleFix,
  RuleListener
} from "@typescript-eslint/utils/dist/ts-eslint";

export const noExpressionEmptyLine = utils.createRule({
  create: (context): RuleListener => ({
    [AST_NODE_TYPES.MemberExpression]: (node): void => {
      const got = s.leadingSpaces(context.code.slice(node.object.range[1]));

      const expected = evaluate(() => {
        const lines = s.lines(got);

        return lines.length >= 3 ? `${a.first(lines)}\n${a.last(lines)}` : got;
      });

      if (got === expected) {
        // Valid
      } else
        context.report({
          fix: (): RuleFix => ({
            range: [node.object.range[1], node.object.range[1] + got.length],
            text: expected
          }),
          messageId: "unexpectedEmptyLine",
          node
        });
    }
  }),
  fixable: "whitespace",
  isRuleOptions: is.object,
  messages: { unexpectedEmptyLine: "Unexpected empty line" },
  name: "no-expression-empty-line"
});
