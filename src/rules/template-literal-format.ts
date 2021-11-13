import { AST_NODE_TYPES } from "@typescript-eslint/experimental-utils";

import * as a from "@skylib/functions/dist/array";
import * as fn from "@skylib/functions/dist/function";
import * as is from "@skylib/functions/dist/guards";
import * as s from "@skylib/functions/dist/string";

import * as utils from "./utils";

const rule = utils.createRule({
  create(context) {
    return {
      [AST_NODE_TYPES.TemplateLiteral](node): void {
        const lines = s.lines(context.getText(node));

        if (lines.length > 1) {
          const firstLine = a.first(lines);

          const middleLines = lines.slice(1, -1);

          const lastLine = a.last(lines);

          const nonEmptyMiddleLines = middleLines.filter(line => line.length);

          if (
            firstLine === "`" &&
            nonEmptyMiddleLines.length &&
            lastLine.trimStart() === "`"
          ) {
            const padding1 = fn.pipe(
              context.code.slice(0, node.range[0]),
              s.lines,
              a.last,
              s.leadingSpaces
            ).length;

            const padding2 = Math.min(
              ...nonEmptyMiddleLines.map(line => s.leadingSpaces(line).length)
            );

            const padding3 = s.leadingSpaces(lastLine).length;

            const delta2 = padding1 - padding2 + 2;

            const delta3 = padding1 - padding3;

            if (delta2 || delta3)
              context.report({
                fix() {
                  return [
                    {
                      range: node.range,
                      text: [
                        firstLine,
                        ...middleLines.map(line => fixLine(line, delta2)),
                        fixLine(lastLine, delta3)
                      ].join(context.eol)
                    }
                  ];
                },
                messageId: "invalidTemplateLiteralFormat",
                node
              });
          } else
            context.report({
              messageId: "invalidTemplateLiteralFormat",
              node
            });
        }
      }
    };
  },
  fixable: "code",
  isRuleOptions: is.object,
  messages: {
    invalidTemplateLiteralFormat: "Invalid template literal format"
  }
});

export = rule;

/*
|*******************************************************************************
|* Private
|*******************************************************************************
|*/

/**
 * Fixes line.
 *
 * @param line - Line.
 * @param delta - The number of spaces to add/remove.
 * @returns Fixed line.
 */
function fixLine(line: string, delta: number): string {
  return line.length
    ? " ".repeat(s.leadingSpaces(line).length + delta) + line.trimStart()
    : line;
}
