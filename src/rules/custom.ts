import * as utils from "./utils";
import { a, evaluate, is } from "@skylib/functions";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import type { strings } from "@skylib/functions";

export interface Options {
  readonly checkReturnType?: boolean;
  readonly message?: string;
  readonly replacement?: string;
  readonly search?: string;
  readonly selector: strings | string;
  readonly typeHas?: utils.TypeGroup;
  readonly typeHasNoneOf?: utils.TypeGroups;
  readonly typeHasNot?: utils.TypeGroup;
  readonly typeHasOneOf?: utils.TypeGroups;
  readonly typeIs?: utils.TypeGroup;
  readonly typeIsNoneOf?: utils.TypeGroups;
  readonly typeIsNot?: utils.TypeGroup;
  readonly typeIsOneOf?: utils.TypeGroups;
}

export enum MessageId {
  customMessage = "customMessage"
}

export const custom = utils.createRule({
  name: "custom",
  fixable: utils.Fixable.code,
  isOptions: evaluate(() =>
    is.object.factory<Options>(
      { selector: is.or.factory(is.string, is.strings) },
      {
        checkReturnType: is.boolean,
        message: is.string,
        replacement: is.string,
        search: is.string,
        typeHas: utils.isTypeGroup,
        typeHasNoneOf: utils.isTypeGroups,
        typeHasNot: utils.isTypeGroup,
        typeHasOneOf: utils.isTypeGroups,
        typeIs: utils.isTypeGroup,
        typeIsNoneOf: utils.isTypeGroups,
        typeIsNot: utils.isTypeGroup,
        typeIsOneOf: utils.isTypeGroups
      }
    )
  ),
  messages: { [MessageId.customMessage]: "{{ message }}" },
  create: (context): RuleListener => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Postponed
    const listener = getVisitors();

    return context.defineTemplateBodyVisitor(listener, listener);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Postponed
    function getVisitors(): any {
      const {
        checkReturnType,
        message,
        replacement,
        search,
        selector: mixed,
        typeHas,
        typeHasNoneOf,
        typeHasNot,
        typeHasOneOf,
        typeIs,
        typeIsNoneOf,
        typeIsNot,
        typeIsOneOf
      } = { checkReturnType: false, ...context.options };

      const selector = a.fromMixed(mixed).join(", ");

      return {
        [selector]: (node: TSESTree.Node): void => {
          const types = evaluate(() => {
            const tsNode = context.toTsNode(node);

            const type = context.checker.getTypeAtLocation(tsNode);

            return checkReturnType
              ? type
                  .getCallSignatures()
                  .map(signature => signature.getReturnType())
              : [type];
          });

          if (
            types.some(type => context.typeCheck.typeIs(type, typeIs)) &&
            types.some(type =>
              context.typeCheck.typeHasNot(type, typeHasNot)
            ) &&
            types.some(type => context.typeCheck.typeIsNot(type, typeIsNot)) &&
            types.some(type => context.typeCheck.typeHas(type, typeHas)) &&
            types.some(type =>
              context.typeCheck.typeHasNoneOf(type, typeHasNoneOf)
            ) &&
            types.some(type =>
              context.typeCheck.typeHasOneOf(type, typeHasOneOf)
            ) &&
            types.some(type =>
              context.typeCheck.typeIsNoneOf(type, typeIsNoneOf)
            ) &&
            types.some(type => context.typeCheck.typeIsOneOf(type, typeIsOneOf))
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
              loc: context.getLocFromRange(node.range),
              messageId: MessageId.customMessage
            });
        }
      };
    }
  }
});
