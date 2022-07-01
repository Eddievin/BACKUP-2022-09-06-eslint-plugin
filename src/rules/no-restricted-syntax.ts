import * as utils from "./utils";
import { a, createValidationObject, evaluate, is, o } from "@skylib/functions";
import * as ts from "typescript";
import type { strings } from "@skylib/functions";
import type { TSESTree } from "@typescript-eslint/utils";

export const noRestrictedSyntax = utils.createRule({
  create: context => {
    return o.fromEntries(
      context.subOptionsArray.map(subOptions => {
        const {
          message,
          notType,
          replacement,
          search,
          selector: mixed,
          type
        } = subOptions;

        const selector = a.fromMixed(mixed).join(", ");

        return [
          selector,
          (node: TSESTree.Node): void => {
            if (isType(node, type) && isNotType(node, notType))
              context.report({
                data: {
                  message: message ?? `This syntax is not allowed: ${selector}`
                },
                fix: () =>
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
                messageId: "customMessage"
              });
          }
        ];
      })
    );

    function isNotType(node: TSESTree.Node, expected?: Type): boolean {
      return expected ? !isType(node, expected) : true;
    }

    function isType(node: TSESTree.Node, expected?: Type): boolean {
      if (expected) {
        const tsNode = context.toTsNode(node);

        const type = context.checker.getTypeAtLocation(tsNode);

        switch (expected) {
          case "any":
            return type.getFlags() === ts.TypeFlags.Any;

          case "array":
            return context.checker.isArrayType(type);

          case "boolean":
            return (
              type.getFlags() === ts.TypeFlags.Boolean ||
              type.getFlags() === ts.TypeFlags.BooleanLike ||
              type.getFlags() === ts.TypeFlags.BooleanLiteral
            );

          case "null":
            return type.getFlags() === ts.TypeFlags.Null;

          case "number":
            return (
              type.getFlags() === ts.TypeFlags.Number ||
              type.getFlags() === ts.TypeFlags.NumberLike ||
              type.getFlags() === ts.TypeFlags.NumberLiteral
            );

          case "string":
            return (
              type.getFlags() === ts.TypeFlags.String ||
              type.getFlags() === ts.TypeFlags.StringLike ||
              type.getFlags() === ts.TypeFlags.StringLiteral
            );

          case "symbol":
            return (
              type.getFlags() === ts.TypeFlags.ESSymbol ||
              type.getFlags() === ts.TypeFlags.ESSymbolLike ||
              type.getFlags() === ts.TypeFlags.UniqueESSymbol
            );

          case "undefined":
            return type.getFlags() === ts.TypeFlags.Undefined;

          case "unknown":
            return type.getFlags() === ts.TypeFlags.Unknown;
        }
      }

      return true;
    }
  },
  fixable: "code",
  isRuleOptions: is.object,
  isSubOptions: evaluate(() => {
    const TypeVO = createValidationObject<Type>({
      any: "any",
      array: "array",
      boolean: "boolean",
      null: "null",
      number: "number",
      string: "string",
      symbol: "symbol",
      undefined: "undefined",
      unknown: "unknown"
    });

    const isType = is.factory(is.enumeration, TypeVO);

    return is.object.factory<SubOptions>(
      { selector: is.or.factory(is.string, is.strings) },
      {
        message: is.string,
        notType: isType,
        replacement: is.string,
        search: is.string,
        type: isType
      }
    );

    interface SubOptions {
      readonly message?: string;
      readonly notType?: Type;
      readonly replacement?: string;
      readonly search?: string;
      readonly selector: strings | string;
      readonly type?: Type;
    }
  }),
  messages: { customMessage: "{{ message }}" },
  name: "no-restricted-syntax"
});

type Type =
  | "any"
  | "array"
  | "boolean"
  | "null"
  | "number"
  | "string"
  | "symbol"
  | "undefined"
  | "unknown";
