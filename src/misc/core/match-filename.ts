import * as utils from "../../utils";
import { a, is } from "@skylib/functions";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";

export enum MessageId {
  invalidText = "invalidText"
}

export const matchFilename = utils.createRule({
  name: "match-filename",
  vue: true,
  isOptions: is.object.factory<Options>(
    { prefix: is.string, selector: utils.isSelector, suffix: is.string },
    { format: utils.casing.isFormat }
  ),
  defaultOptions: { prefix: "", suffix: "" },
  messages: { [MessageId.invalidText]: "Should match file name: {{expected}}" },
  create: (context): RuleListener => {
    const { format, prefix, selector: mixed, suffix } = context.options;

    const selector = a.fromMixed(mixed).join(", ");

    return {
      [selector]: (node: TSESTree.Node) => {
        const got = utils.nodeText(node, "?");

        const expected =
          prefix + utils.getTextFromPath(context.path, got, format) + suffix;

        if (got === expected) {
          // Valid
        } else
          context.report({
            data: { expected },
            messageId: MessageId.invalidText,
            node
          });
      }
    };
  }
});

export interface Options {
  readonly format?: utils.casing.Format;
  readonly prefix: string;
  readonly selector: utils.Selector;
  readonly suffix: string;
}
