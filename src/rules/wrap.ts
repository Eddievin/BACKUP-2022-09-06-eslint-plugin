import * as utils from "../utils";
import {
  ProxyHandlerAction,
  a,
  as,
  is,
  reflect,
  typedef,
  wrapProxyHandler
} from "@skylib/functions";
import type {
  RuleContext,
  RuleListener,
  RuleModule
} from "@typescript-eslint/utils/dist/ts-eslint";
import type { Writable, strings } from "@skylib/functions";
import type { TSESTree } from "@typescript-eslint/utils";

export interface Options {
  readonly lintSelector: utils.Selector;
  readonly plugin: string;
  readonly rule: string;
  readonly skipSelector: utils.Selector;
}

export enum MessageId {
  customMessage = "customMessage"
}

export const wrap = utils.createRule({
  name: "wrap",
  fixable: utils.Fixable.code,
  vue: true,
  isOptions: is.object.factory<Options>(
    {
      lintSelector: utils.isSelector,
      plugin: is.string,
      rule: is.string,
      skipSelector: utils.isSelector
    },
    {}
  ),
  defaultOptions: { lintSelector: [], skipSelector: [] },
  messages: { [MessageId.customMessage]: "{{message}}" },
  create: (context): RuleListener => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Ok
    const plugin = require(context.options.plugin);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- Ok
    const rule = plugin.rules[context.options.rule] as RuleModule<string>;

    const lintSelector = a.fromMixed(context.options.lintSelector).join(", ");

    const skipSelector = a.fromMixed(context.options.skipSelector).join(", ");

    const lintIds: Writable<strings> = [];

    const skipIds: Writable<strings> = [];

    const reports: Writable<utils.ReportDescriptors> = [];

    const listener1 = rule.create(
      new Proxy(
        {} as Readonly<RuleContext<never, never>>,
        wrapProxyHandler("eslint-wrap-rule", ProxyHandlerAction.throw, {
          get: (_target, key) =>
            key === "report"
              ? (report: utils.ReportDescriptor) => {
                  reports.push(report);
                }
              : // eslint-disable-next-line @skylib/custom/functions/no-reflect-get -- Ok
                reflect.get(context.rawContext, key)
        })
      )
    );

    const listener2 = lintSelector
      ? typedef<RuleListener>({
          [lintSelector]: (node: TSESTree.Node) => {
            lintIds.push(utils.nodeId(node));
          }
        })
      : {};

    const listener3 = skipSelector
      ? typedef<RuleListener>({
          [skipSelector]: (node: TSESTree.Node) => {
            skipIds.push(utils.nodeId(node));
          }
        })
      : {};

    const listener4: RuleListener = {
      "Program:exit": () => {
        const matcher = utils.createStringMatcher(
          {
            allow: lintIds,
            disallow: skipIds,
            type: utils.MatcherType.disallowAllow
          },
          false
        );

        for (const report of reports) {
          const { data, messageId } = {
            data: {},
            ...report
          } as const;

          const message = as.not
            .empty(rule.meta.messages[messageId])
            .replace(/\{\{\s*(\w+)\s*\}\}/gu, (_str, match1: string) => {
              const result = data[match1];

              return is.numStr(result) ? result.toString() : "?";
            });

          const ignore = "node" in report && matcher(utils.nodeId(report.node));

          if (ignore) {
            // Ignore
          } else
            context.rawContext.report({
              ...report,
              data: { message },
              messageId: MessageId.customMessage
            });
        }
      }
    };

    return utils.mergeListenters(listener1, listener2, listener3, listener4);
  }
});
