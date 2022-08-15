import * as utils from "../../utils";
import { assert, is } from "@skylib/functions";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";

export interface Options {
  readonly message?: string;
  readonly once: boolean;
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

    const selector = utils.selector(mixedSelector);

    const trigger = utils.selector(mixedTrigger);

    let selectorCount = 0;

    let triggerCount = 0;

    assert.toBeTrue(selector !== "", "Expecting selector");
    assert.toBeTrue(trigger !== "", "Expecting trigger");

    return utils.mergeListeners(
      {
        [selector]: () => {
          selectorCount++;
        }
      },
      {
        [trigger]: () => {
          triggerCount++;
        }
      },
      {
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
                data: {
                  message: message ?? `Require syntax once: ${selector}`
                },
                loc: context.locZero,
                messageId: MessageId.customMessage
              });
          }
        }
      }
    );
  }
});
