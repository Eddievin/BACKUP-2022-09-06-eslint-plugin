import * as utils from "../../utils";
import { a, assert, is } from "@skylib/functions";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";

export interface Options {
  readonly message?: string;
  readonly replacement?: string;
  readonly search?: string;
  readonly selector: utils.Selector;
}

export enum MessageId {
  customMessage = "customMessage"
}

export const restrictSyntax = utils.createRule({
  name: "restrict-syntax",
  fixable: utils.Fixable.code,
  vue: true,
  isOptions: is.object.factory<Options>(
    { selector: utils.isSelector },
    { message: is.string, replacement: is.string, search: is.string }
  ),
  messages: { [MessageId.customMessage]: "{{message}}" },
  create: (context): RuleListener => {
    const { message, replacement, search, selector: mixed } = context.options;

    const selector = a.fromMixed(mixed).join(", ");

    assert.toBeTrue(selector !== "", "Expecting selector");

    return {
      [selector]: (node: TSESTree.Node) => {
        context.report({
          data: {
            message: message ?? `This syntax is not allowed: ${selector}`
          },
          fix: (): utils.RuleFixes =>
            is.not.empty(replacement)
              ? [
                  {
                    range: node.range,
                    text: is.not.empty(search)
                      ? context.getText(node).replace(
                          // eslint-disable-next-line security/detect-non-literal-regexp -- Ok
                          new RegExp(search, "u"),
                          replacement
                        )
                      : replacement
                  }
                ]
              : [],
          messageId: MessageId.customMessage,
          node
        });
      }
    };
  }
});
