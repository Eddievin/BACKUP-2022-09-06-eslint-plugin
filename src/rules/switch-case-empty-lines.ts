import * as utils from "./utils";
import type {
  RuleFix,
  RuleListener
} from "@typescript-eslint/utils/dist/ts-eslint";
import { a, s } from "@skylib/functions";

export enum MessageId {
  addEmptyLine = "addEmptyLine",
  removeEmptyLine = "removeEmptyLine"
}

export const switchCaseEmptyLines = utils.createRule({
  name: "switch-case-empty-lines",
  fixable: utils.Fixable.whitespace,
  messages: {
    [MessageId.addEmptyLine]: "Add empty line before switch case",
    [MessageId.removeEmptyLine]: "Remove empty line before switch case"
  },
  create: (context, typeCheck): RuleListener => ({
    SwitchStatement: (node): void => {
      for (const [case1, case2] of a.chain(node.cases)) {
        const fallThrough = case1.consequent.length === 0;

        const got = typeCheck.getLeadingTrivia(case2);

        const expected =
          context.eol.repeat(fallThrough ? 1 : 2) +
          s.trimLeadingEmptyLines(got);

        if (got === expected) {
          // Valid
        } else
          context.report({
            fix: (): RuleFix => ({
              range: [case2.range[0] - got.length, case2.range[0]],
              text: expected
            }),
            messageId: fallThrough
              ? MessageId.removeEmptyLine
              : MessageId.addEmptyLine,
            node: case2
          });
      }
    }
  })
});
