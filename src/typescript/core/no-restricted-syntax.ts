import * as _ from "@skylib/lodash-commonjs-es";
import * as utils from "../../utils";
import { a, assert, evaluate, is, typedef } from "@skylib/functions";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import type { Writable } from "@skylib/functions";

export interface Options {
  readonly checkArrayType: boolean;
  readonly checkReturnType: boolean;
  readonly ignoreSelector: utils.Selector;
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

export const noRestrictedSyntax = utils.createRule({
  name: "no-restricted-syntax",
  fixable: utils.Fixable.code,
  vue: true,
  isOptions: is.object.factory<Options>(
    {
      checkArrayType: is.boolean,
      checkReturnType: is.boolean,
      ignoreSelector: utils.isSelector,
      selector: utils.isSelector
    },
    {
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
  defaultOptions: {
    checkArrayType: false,
    checkReturnType: false,
    ignoreSelector: []
  },
  messages: { [MessageId.customMessage]: "{{message}}" },
  create: (context, typeCheck): RuleListener => {
    const {
      checkArrayType,
      checkReturnType,
      ignoreSelector: ignoreMixed,
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
    } = context.options;

    const selector = a.fromMixed(mixed).join(", ");

    const ignoreSelector = a.fromMixed(ignoreMixed).join(", ");

    assert.toBeTrue(selector !== "", "Expecting selector");

    const nodes: Writable<utils.Nodes> = [];

    const ignoreNodes: Writable<utils.Nodes> = [];

    const listener1: RuleListener = {
      [selector]: (node: TSESTree.Node) => {
        if (ignoreSelector) nodes.push(node);
        else lintNode(node);
      }
    };

    const listener2 = ignoreSelector
      ? typedef<RuleListener>({
          [ignoreSelector]: (node: TSESTree.Node) => {
            ignoreNodes.push(node);
          }
        })
      : {};

    const listener3: RuleListener = {
      "Program:exit": () => {
        for (const node of _.difference(nodes, ignoreNodes)) lintNode(node);
      }
    };

    return utils.mergeListenters(listener1, listener2, listener3);

    function lintNode(node: TSESTree.Node): void {
      const types = evaluate(() => {
        const type = typeCheck.getType(node);

        if (checkArrayType)
          return typeCheck.isArrayOrTupleType(type) && type.typeArguments
            ? type.typeArguments
            : undefined;

        if (checkReturnType)
          return type.getCallSignatures().length
            ? type
                .getCallSignatures()
                .map(signature => signature.getReturnType())
            : undefined;

        return [type];
      });

      if (
        types &&
        types.every(
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
  }
});
