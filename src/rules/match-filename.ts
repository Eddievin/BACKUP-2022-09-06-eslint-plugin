import * as utils from "./utils";
import { a, is } from "@skylib/functions";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import type { strings } from "@skylib/functions";

export interface Options {
  readonly format: utils.casing.Format;
  readonly prefix: string;
  readonly selector: strings | string;
  readonly suffix: string;
}

export enum MessageId {
  invalidNodeText = "invalidNodeText"
}

export const matchFilename = utils.createRule({
  name: "match-filename",
  vue: true,
  isOptions: is.object.factory<Options>(
    {
      format: utils.casing.isFormat,
      prefix: is.string,
      selector: is.string,
      suffix: is.string
    },
    {}
  ),
  defaultOptions: {
    format: utils.casing.Format.camelCase,
    prefix: "",
    suffix: ""
  },
  messages: {
    [MessageId.invalidNodeText]:
      "Node text should match file name: {{ expected }}"
  },
  create: (context): RuleListener => {
    const { format, prefix, selector: mixed, suffix } = context.options;

    const selector = a.fromMixed(mixed).join(", ");

    return {
      [selector]: (node: TSESTree.Node): void => {
        const got = utils.nodeToString(node, context);

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
            messageId: MessageId.invalidNodeText,
            node
          });
      }
    };
  }
});
