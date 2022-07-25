import * as utils from "../../utils";
import { a, is } from "@skylib/functions";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";

export interface Options {
  readonly format: utils.casing.Format;
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
    {
      format: utils.casing.isFormat,
      prefix: is.string,
      selector: utils.isSelector,
      suffix: is.string
    },
    {}
  ),
  defaultOptions: {
    format: utils.casing.Format.camelCase,
    prefix: "",
    suffix: ""
  },
  messages: { [MessageId.invalidText]: "Should match file name: {{expected}}" },
  create: (context): RuleListener => {
    const { format, prefix, selector: mixed, suffix } = context.options;

    const selector = a.fromMixed(mixed).join(", ");

    return {
      [selector]: (node: TSESTree.Node) => {
        const got = utils.nodeText(node, "?");

        const expected =
          prefix +
          utils.casing.format(
            utils.getIdentifierFromPath(context.path, got),
            format
          ) +
          suffix;

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
