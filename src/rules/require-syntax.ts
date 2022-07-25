import * as utils from "../utils";
import { a, assert, is } from "@skylib/functions";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";

export interface Options {
  readonly message?: string;
  readonly selector: utils.Selector;
  readonly trigger: utils.Selector;
}

export enum MessageId {
  customMessage = "customMessage"
}

export const requireSyntax = utils.createRule({
  name: "require-syntax",
  fixable: utils.Fixable.code,
  vue: true,
  isOptions: is.object.factory<Options>(
    { selector: utils.isSelector, trigger: utils.isSelector },
    { message: is.string }
  ),
  defaultOptions: { trigger: "Program" },
  messages: { [MessageId.customMessage]: "{{message}}" },
  create: (context): RuleListener => {
    const {
      message,
      selector: mixedSelector,
      trigger: mixedTrigger
    } = context.options;

    const selector = a.fromMixed(mixedSelector).join(", ");

    const trigger = a.fromMixed(mixedTrigger).join(", ");

    let selectorCount = 0;

    let triggerCount = 0;

    assert.toBeTrue(selector !== "", "Expecting selector");
    assert.toBeTrue(trigger !== "", "Expecting trigger");

    return {
      "Program:exit": (): void => {
        if (triggerCount)
          if (selectorCount === 1) {
            // Valid
          } else
            context.report({
              data: { message: message ?? `Missing syntax: ${selector}` },
              loc: context.locZero,
              messageId: MessageId.customMessage
            });
      },
      [selector]: (): void => {
        selectorCount++;
      },
      [trigger]: (): void => {
        triggerCount++;
      }
    };
  }
});
