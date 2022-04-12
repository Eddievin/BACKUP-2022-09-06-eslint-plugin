import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import * as a from "@skylib/functions/dist/array";
import * as is from "@skylib/functions/dist/guards";
import * as s from "@skylib/functions/dist/string";

import * as utils from "./utils";

const rule = utils.createRule({
  create(context) {
    return {
      [AST_NODE_TYPES.SwitchStatement](node): void {
        for (const [case1, case2] of a.chain(node.cases)) {
          const spread = case1.consequent.length > 0;

          const count = spread ? 2 : 1;

          const messageId = spread
            ? "expectingEmptyLine"
            : "unexpectedEmptyLine";

          const got = context.getLeadingTrivia(case2);

          const expected =
            context.eol.repeat(count) + s.trimLeadingEmptyLines(got);

          if (got !== expected)
            context.report({
              fix() {
                return [
                  {
                    range: [case2.range[0] - got.length, case2.range[0]],
                    text: expected
                  }
                ];
              },
              messageId,
              node: case2
            });
        }
      }
    };
  },
  fixable: "whitespace",
  isRuleOptions: is.object,
  messages: {
    expectingEmptyLine: "Expecting empty line before",
    unexpectedEmptyLine: "Unexpected empty line before"
  },
  name: "switch-case-empty-lines"
});

export = rule;
