import * as a from "@skylib/functions/dist/array";
import * as fn from "@skylib/functions/dist/function";
import * as is from "@skylib/functions/dist/guards";
import * as s from "@skylib/functions/dist/string";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import * as utils from "./utils";

const rule = utils.createRule({
  create(context) {
    return {
      [AST_NODE_TYPES.MemberExpression](node): void {
        const got = s.leadingSpaces(context.code.slice(node.object.range[1]));

        const expected = fn.run(() => {
          const lines = s.lines(got);

          return lines.length >= 3
            ? `${a.first(lines)}\n${a.last(lines)}`
            : got;
        });

        if (got === expected) {
          // Valid
        } else
          context.report({
            fix() {
              return {
                range: [
                  node.object.range[1],
                  node.object.range[1] + got.length
                ],
                text: expected
              };
            },
            messageId: "unexpectedEmptyLine",
            node
          });
      }
    };
  },
  fixable: "whitespace",
  isRuleOptions: is.object,
  messages: { unexpectedEmptyLine: "Unexpected empty line" },
  name: "no-expression-empty-line"
});

export = rule;
