import * as utils from "../../utils";
import { assert, is } from "@skylib/functions";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import type { Writable } from "@skylib/functions";

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

    let count = 0;

    const nodes: Writable<utils.TSESTree.Nodes> = [];

    assert.toBeTrue(selector !== "", "Expecting selector");
    assert.toBeTrue(trigger !== "", "Expecting trigger");

    return utils.mergeListeners(
      {
        [selector]: () => {
          count++;
        }
      },
      {
        [trigger]: (node: TSESTree.Node) => {
          nodes.push(node);
        }
      },
      {
        "Program:exit": () => {
          for (const node of nodes) {
            if (count === 0)
              context.report({
                data: { message: message ?? `Missing syntax: ${selector}` },
                loc:
                  trigger === "Program"
                    ? context.locZero
                    : context.getLoc(node.range),
                messageId: MessageId.customMessage
              });

            if (count > 1 && once)
              context.report({
                data: {
                  message: message ?? `Require syntax once: ${selector}`
                },
                loc:
                  trigger === "Program"
                    ? context.locZero
                    : context.getLoc(node.range),
                messageId: MessageId.customMessage
              });
          }
        }
      }
    );
  }
});
