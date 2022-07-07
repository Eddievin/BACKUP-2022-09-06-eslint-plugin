import * as utils from "./utils";
import { a, is, s } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type {
  RuleFix,
  RuleListener
} from "@typescript-eslint/utils/dist/ts-eslint";

export const switchCaseEmptyLines = utils.createRule({
  create: (context): RuleListener => ({
    [AST_NODE_TYPES.SwitchStatement]: (node): void => {
      for (const [case1, case2] of a.chain(node.cases)) {
        const spread = case1.consequent.length > 0;

        const count = spread ? 2 : 1;

        const messageId = spread ? "expectingEmptyLine" : "unexpectedEmptyLine";

        const got = context.getLeadingTrivia(case2);

        const expected =
          context.eol.repeat(count) + s.trimLeadingEmptyLines(got);

        if (got === expected) {
          // Valid
        } else
          context.report({
            fix: (): RuleFix => ({
              range: [case2.range[0] - got.length, case2.range[0]],
              text: expected
            }),
            messageId,
            node: case2
          });
      }
    }
  }),
  fixable: "whitespace",
  isRuleOptions: is.object,
  messages: {
    expectingEmptyLine: "Expecting empty line before",
    unexpectedEmptyLine: "Unexpected empty line before"
  },
  name: "switch-case-empty-lines"
});
