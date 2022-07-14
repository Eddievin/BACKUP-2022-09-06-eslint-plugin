import * as utils from "./utils";
import type {
  RuleFix,
  RuleListener
} from "@typescript-eslint/utils/dist/ts-eslint";
import { evaluate, is, num } from "@skylib/functions";

export interface Options {
  readonly maxLineLength: number;
  readonly maxObjectSize: number;
}

export enum MessageId {
  expectingMultiline = "expectingMultiline",
  expectingSingleLine = "expectingSingleLine"
}

export const objectFormat = utils.createRule({
  name: "object-format",
  fixable: utils.Fixable.code,
  isOptions: is.object.factory<Options>(
    { maxLineLength: is.number, maxObjectSize: is.number },
    {}
  ),
  defaultOptions: { maxLineLength: 80, maxObjectSize: 2 },
  messages: {
    [MessageId.expectingMultiline]: "Expecting multiline object literal",
    [MessageId.expectingSingleLine]: "Expecting single-line object literal"
  },
  create: (context): RuleListener => {
    const listener: RuleListener = {
      ObjectExpression: (node): void => {
        const texts = node.properties.map(property =>
          context.getTextWithLeadingTrivia(property).trim()
        );

        if (texts.length) {
          const predictedLength = evaluate(() => {
            const headLength = context.getLocFromRange(node.range).start.column;

            const tailLength = evaluate(() => {
              const tail = context.code.slice(node.range[1]);

              if (tail.startsWith(" as ")) return 1000;

              if (tail.startsWith(");")) return 2;

              return 1;
            });

            return (
              headLength +
              2 +
              num.sum(...texts.map(text => text.trim().length)) +
              2 * (texts.length - 1) +
              2 +
              tailLength
            );
          });

          const expectMultiline = texts.length > context.options.maxObjectSize;

          const gotMultiline = isMultiline(context.getText(node));

          const keepMultiline =
            predictedLength > context.options.maxLineLength ||
            texts.some(text => isMultiline(text)) ||
            node.properties.some(property =>
              context.hasTrailingComment(property)
            );

          const expectSingleLine = !expectMultiline && !keepMultiline;

          const gotSingleLine = isSingleLine(context.getText(node));

          if (expectMultiline && !gotMultiline)
            context.report({
              fix: (): RuleFix => ({
                range: node.range,
                text: `{\n${texts.join(",\n")}\n}`
              }),
              messageId: MessageId.expectingMultiline,
              node
            });

          if (expectSingleLine && !gotSingleLine)
            context.report({
              fix: (): RuleFix => ({
                range: node.range,
                text: `{${texts.join(",")}}`
              }),
              messageId: MessageId.expectingSingleLine,
              node
            });
        }
      }
    };

    return context.defineTemplateBodyVisitor(listener, listener);
  }
});

// eslint-disable-next-line no-warning-comments -- Postponed
// fixme: use @skylib/functions
// eslint-disable-next-line @skylib/require-jsdoc -- Postponed
function isMultiline(str: string): boolean {
  return str.includes("\n");
}

// eslint-disable-next-line no-warning-comments -- Postponed
// fixme: use @skylib/functions
// eslint-disable-next-line @skylib/require-jsdoc -- Postponed
function isSingleLine(str: string): boolean {
  return !str.includes("\n");
}
