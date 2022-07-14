import * as utils from "./utils";
import type {
  RuleFix,
  RuleListener
} from "@typescript-eslint/utils/dist/ts-eslint";
import { a, evaluate, s } from "@skylib/functions";

export enum MessageId {
  unexpectedEmptyLine = "unexpectedEmptyLine"
}

export const noExpressionEmptyLines = utils.createRule({
  name: "no-expression-empty-lines",
  fixable: utils.Fixable.whitespace,
  vue: true,
  messages: { [MessageId.unexpectedEmptyLine]: "Unexpected empty line" },
  create: (context): RuleListener => ({
    MemberExpression: (node): void => {
      const object = node.object;

      const got = s.leadingSpaces(context.code.slice(object.range[1]));

      const expected = evaluate(() => {
        const lines = s.lines(got);

        return lines.length >= 3 ? `${a.first(lines)}\n${a.last(lines)}` : got;
      });

      if (got === expected) {
        // Valid
      } else
        context.report({
          fix: (): RuleFix => ({
            range: [object.range[1], object.range[1] + got.length],
            text: expected
          }),
          messageId: MessageId.unexpectedEmptyLine,
          node
        });
    }
  })
});
