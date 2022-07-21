import * as utils from "./utils";
import {
  ProxyHandlerAction,
  a,
  as,
  evaluate,
  is,
  reflect,
  wrapProxyHandler
} from "@skylib/functions";
import type {
  RuleContext,
  RuleListener
} from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import type { Writable } from "@skylib/functions";
import { rules } from "@typescript-eslint/eslint-plugin";

export interface Options {
  readonly lint: utils.Selector;
  readonly rule: string;
  readonly skip: utils.Selector;
}

export enum MessageId {
  customMessage = "customMessage"
}

export const wrap = utils.createRule({
  name: "wrap",
  fixable: utils.Fixable.code,
  vue: true,
  isOptions: evaluate(() =>
    is.object.factory<Options>(
      { lint: utils.isSelector, rule: is.string, skip: utils.isSelector },
      {}
    )
  ),
  defaultOptions: { lint: [], skip: [] },
  messages: { [MessageId.customMessage]: "{{ message }}" },
  create: (context): RuleListener => {
    const { lint, skip } = context.options;

    const lintSelector = a.fromMixed(lint).join(", ");

    const skipSelector = a.fromMixed(skip).join(", ");

    const lintNodes = new Set<TSESTree.Node>();

    const skipNodes = new Set<TSESTree.Node>();

    const rule = as.not.empty(rules["no-shadow"]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Ok
    const target = {} as Readonly<RuleContext<any, any>>;

    const reportDescriptors: Writable<utils.ReportDescriptors> = [];

    const listener1 = rule.create(
      new Proxy(
        target,
        wrapProxyHandler("wrap-rule", ProxyHandlerAction.throw, {
          get: (_target, key) =>
            key === "report"
              ? (descriptor: utils.ReportDescriptor) => {
                  reportDescriptors.push(descriptor);
                }
              : // eslint-disable-next-line @skylib/custom/functions/no-reflect-get -- Ok
                reflect.get(context.rawContext, key)
        })
      )
    );

    const listener2 = evaluate((): RuleListener => {
      if (skipSelector)
        return {
          [skipSelector]: (node: TSESTree.Node) => {
            skipNodes.add(node);
          }
        };

      return {};
    });

    const listener3 = evaluate((): RuleListener => {
      if (lintSelector)
        return {
          [lintSelector]: (node: TSESTree.Node) => {
            lintNodes.add(node);
          }
        };

      return {};
    });

    const listener4: RuleListener = {
      "Program:exit": () => {
        for (const descriptor of reportDescriptors) {
          const { data, messageId } = {
            data: {},
            ...descriptor
          } as const;

          const message = as.not
            .empty(rule.meta.messages[messageId])
            .replace(/\{\{\s*(\w+)\s*\}\}/gu, (_str, match1: string) => {
              const result = data[match1];

              return is.numStr(result) ? result.toString() : "?";
            });

          context.rawContext.report({
            ...descriptor,
            data: { message },
            messageId: MessageId.customMessage
          });
        }
      }
    };

    return utils.mergeListenters(listener1, listener2, listener3, listener4);
  }
});
