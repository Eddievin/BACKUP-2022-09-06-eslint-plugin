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
          replacement,
          search,
          selector: mixed,
          _id,
          typeContain,
          typeDontContain,
          typeEq,
          typeNeq
        } = subOptions;

        const selector = a.fromMixed(mixed).join(", ");

        return [
          selector,
          (node: TSESTree.Node): void => {
            const tsNode = context.toTsNode(node);

            const type = context.checker.getTypeAtLocation(tsNode);

            if (
              isTypeEqualsTo(type, typeEq) &&
              isTypeNotEqualsTo(type, typeNeq) &&
              isTypeIncludes(type, typeContain) &&
              isTypeExcludes(type, typeDontContain)
            )
              context.report({
                data: {
                  message: message ?? `This syntax is not allowed: ${selector}`,
                  _id
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

    function isTypeEqualsTo(type: ts.Type, expected?: Type): boolean {
      if (expected)
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

      return true;
    }

    function isTypeExcludes(type: ts.Type, expected?: Type): boolean {
      return expected ? !isTypeIncludes(type, expected) : true;
    }

    function isTypeIncludes(type: ts.Type, expected?: Type): boolean {
      return expected
        ? isTypeEqualsTo(type, expected) ||
            (type.isUnion() &&
              type.types.some(subtype => isTypeEqualsTo(subtype, expected)))
        : true;
    }

    function isTypeNotEqualsTo(type: ts.Type, expected?: Type): boolean {
      return expected ? !isTypeEqualsTo(type, expected) : true;
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
        replacement: is.string,
        search: is.string,
        _id: is.string,
        typeContain: isType,
        typeDontContain: isType,
        typeEq: isType,
        typeNeq: isType
      }
    );

    interface SubOptions {
      readonly message?: string;
      readonly replacement?: string;
      readonly search?: string;
      readonly selector: strings | string;
      readonly _id?: string;
      readonly typeContain?: Type;
      readonly typeDontContain?: Type;
      readonly typeEq?: Type;
      readonly typeNeq?: Type;
    }
  }),
  messages: { customMessage: "{{ message }} ({{ _id }})" },
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
