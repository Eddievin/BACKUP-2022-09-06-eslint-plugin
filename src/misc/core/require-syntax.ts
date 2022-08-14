import * as utils from "../../utils";
import { a, assert, is } from "@skylib/functions";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";

export enum MessageId {
  customMessage = "customMessage"
}

export const requireSyntax = utils.createRule({
  name: "require-syntax",
  fixable: utils.Fixable.code,
  vue: true,
  isOptions: is.object.factory<Options>(
    { once: is.boolean, selector: utils.isSelector, trigger: utils.isSelector },
    { message: is.string }
  ),
  defaultOptions: { once: false, trigger: "Program" },
  messages: { [MessageId.customMessage]: "{{message}}" },
  create: (context): RuleListener => {
    const {
      message,
      once,
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
      "Program:exit": () => {
        if (triggerCount) {
          if (selectorCount === 0)
            context.report({
              data: { message: message ?? `Missing syntax: ${selector}` },
              loc: context.locZero,
              messageId: MessageId.customMessage
            });

          if (selectorCount > 1 && once)
            context.report({
              data: { message: message ?? `Require syntax once: ${selector}` },
              loc: context.locZero,
              messageId: MessageId.customMessage
            });
        }
      },
      [selector]: () => {
        selectorCount++;
      },
      [trigger]: () => {
        triggerCount++;
      }
    };
  }
});

export interface Options {
  readonly message?: string;
  readonly once: boolean;
  readonly selector: utils.Selector;
  readonly trigger: utils.Selector;
}
