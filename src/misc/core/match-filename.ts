import * as utils from "../../utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import { is } from "@skylib/functions";

export interface Options {
  readonly format?: utils.Casing;
  readonly prefix: string;
  readonly selector: utils.Selector;
  readonly suffix: string;
}

export enum MessageId {
  invalidText = "invalidText"
}

export const matchFilename = utils.createRule({
  name: "match-filename",
  vue: true,
  isOptions: is.object.factory<Options>(
    { prefix: is.string, selector: utils.isSelector, suffix: is.string },
    { format: utils.isCasing }
  ),
  defaultOptions: { prefix: "", suffix: "" },
  messages: { [MessageId.invalidText]: "Should match file name: {{expected}}" },
  create: (context): RuleListener => {
    const { format, prefix, selector: mixedSelector, suffix } = context.options;

    const selector = utils.selector(mixedSelector);

    return {
      [selector]: (node: TSESTree.Node) => {
        const got = utils.nodeText(node, "?");

        const expected =
          prefix + context.textFromPath(context.filename, got, format) + suffix;

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
