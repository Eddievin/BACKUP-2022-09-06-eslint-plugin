import * as utils from "./utils";
import type {
  RuleFix,
  RuleListener
} from "@typescript-eslint/utils/dist/ts-eslint";
import { a, fn, is, s } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";

export const templateLiteralFormat = utils.createRule({
  name: "template-literal-format",
  fixable: "code",
  isOptions: is.object,
  messages: { invalidTemplateLiteralFormat: "Invalid template literal format" },
  create: (context): RuleListener => ({
    [AST_NODE_TYPES.TemplateLiteral]: (node): void => {
      const lines = s.lines(context.getText(node));

      if (lines.length > 1) {
        const firstLine = a.first(lines);

        const middleLines = lines.slice(1, -1);

        const lastLine = a.last(lines);

        const nonEmptyMiddleLines = middleLines.filter(line => line.length);

        if (
          firstLine === "`" &&
          nonEmptyMiddleLines.length > 0 &&
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
              fix: (): RuleFix => ({
                range: node.range,
                text: [
                  firstLine,
                  ...middleLines.map(line => fixLine(line, delta2)),
                  fixLine(lastLine, delta3)
                ].join(context.eol)
              }),
              messageId: "invalidTemplateLiteralFormat",
              node
            });
        } else
          context.report({ messageId: "invalidTemplateLiteralFormat", node });
      }
    }
  })
});

/**
 * Fixes line.
 *
 * @param line - Line.
 * @param delta - The number of spaces to add/remove.
 * @returns Fixed line.
 */
function fixLine(line: string, delta: number): string {
  return line.length > 0
    ? " ".repeat(s.leadingSpaces(line).length + delta) + line.trimStart()
    : line;
}
