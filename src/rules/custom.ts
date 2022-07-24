import * as utils from "./utils";
import { a, evaluate, is } from "@skylib/functions";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";

export interface Options {
  readonly checkReturnType?: boolean;
  readonly message?: string;
  readonly replacement?: string;
  readonly search?: string;
  readonly selector: utils.Selector;
  readonly typeHas?: utils.TypeGroup;
  readonly typeHasNoneOf?: utils.TypeGroups;
  readonly typeHasOneOf?: utils.TypeGroups;
  readonly typeIs?: utils.TypeGroup;
  readonly typeIsNoneOf?: utils.TypeGroups;
  readonly typeIsOneOf?: utils.TypeGroups;
}

export enum MessageId {
  customMessage = "customMessage"
}

export const custom = utils.createRule({
  name: "custom",
  fixable: utils.Fixable.code,
  vue: true,
  isOptions: is.object.factory<Options>(
    { selector: utils.isSelector },
    {
      checkReturnType: is.boolean,
      message: is.string,
      replacement: is.string,
      search: is.string,
      typeHas: utils.isTypeGroup,
      typeHasNoneOf: utils.isTypeGroups,
      typeHasOneOf: utils.isTypeGroups,
      typeIs: utils.isTypeGroup,
      typeIsNoneOf: utils.isTypeGroups,
      typeIsOneOf: utils.isTypeGroups
    }
  ),
  defaultOptions: { selector: [] },
  messages: { [MessageId.customMessage]: "{{message}}" },
  create: (context, typeCheck): RuleListener => {
    const {
      checkReturnType,
      message,
      replacement,
      search,
      selector: mixed,
      typeHas,
      typeHasNoneOf,
      typeHasOneOf,
      typeIs,
      typeIsNoneOf,
      typeIsOneOf
    } = { checkReturnType: false, ...context.options };

    const selector = a.fromMixed(mixed).join(", ");

    if (selector)
      return {
        [selector]: (node: TSESTree.Node): void => {
          const types = evaluate(() => {
            const type = typeCheck.getType(node);

            return checkReturnType
              ? type
                  .getCallSignatures()
                  .map(signature => signature.getReturnType())
              : [type];
          });

          if (
            types.some(
              type =>
                typeCheck.typeIs(type, typeIs) &&
                typeCheck.typeIsNoneOf(type, typeIsNoneOf) &&
                typeCheck.typeIsOneOf(type, typeIsOneOf) &&
                typeCheck.typeHas(type, typeHas) &&
                typeCheck.typeHasNoneOf(type, typeHasNoneOf) &&
                typeCheck.typeHasOneOf(type, typeHasOneOf)
            )
          )
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

    return {};
  }
});
