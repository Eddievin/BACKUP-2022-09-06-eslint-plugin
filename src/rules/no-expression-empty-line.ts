import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import * as a from "@skylib/functions/dist/array";
import * as is from "@skylib/functions/dist/guards";
import * as s from "@skylib/functions/dist/string";

import * as utils from "./utils";

const rule = utils.createRule({
  create(context) {
    return {
      [AST_NODE_TYPES.MemberExpression](node): void {
        const lines = s.lines(
          context.code.slice(node.object.range[1], node.property.range[0])
        );

        if (lines.length >= 3)
          context.report({
            fix() {
              return {
                range: [node.object.range[1], node.property.range[0]],
                text: `${a.first(lines)}\n${a.last(lines)}`
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
