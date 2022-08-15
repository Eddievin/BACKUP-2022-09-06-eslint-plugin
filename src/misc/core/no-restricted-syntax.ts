import * as _ from "@skylib/lodash-commonjs-es";
import * as utils from "../../utils";
import { assert, is, typedef } from "@skylib/functions";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import type { Writable } from "@skylib/functions";

export interface Options {
  readonly ignoreSelector: utils.Selector;
  readonly message?: string;
  readonly replacement?: string;
  readonly search?: string;
  readonly selector: utils.Selector;
}

export enum MessageId {
  customMessage = "customMessage"
}

export const noRestrictedSyntax = utils.createRule({
  name: "no-restricted-syntax",
  fixable: utils.Fixable.code,
  vue: true,
  isOptions: is.object.factory<Options>(
    { ignoreSelector: utils.isSelector, selector: utils.isSelector },
    { message: is.string, replacement: is.string, search: is.string }
  ),
  defaultOptions: { ignoreSelector: [] },
  messages: { [MessageId.customMessage]: "{{message}}" },
  create: (context): RuleListener => {
    const {
      ignoreSelector: mixedIgnoreSelector,
      message,
      replacement,
      search,
      selector: mixedSelector
    } = context.options;

    const selector = utils.selector(mixedSelector);

    const ignoreSelector = utils.selector(mixedIgnoreSelector);

    assert.toBeTrue(selector !== "", "Expecting selector");

    const nodes: Writable<utils.TSESTree.Nodes> = [];

    const ignoreNodes: Writable<utils.TSESTree.Nodes> = [];

    return utils.mergeListeners(
      {
        [selector]: (node: TSESTree.Node) => {
          nodes.push(node);
        }
      },
      ignoreSelector
        ? typedef<RuleListener>({
            [ignoreSelector]: (node: TSESTree.Node) => {
              ignoreNodes.push(node);
            }
          })
        : {},
      {
        "Program:exit": () => {
          for (const node of _.difference(nodes, ignoreNodes))
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
      }
    );
  }
});
