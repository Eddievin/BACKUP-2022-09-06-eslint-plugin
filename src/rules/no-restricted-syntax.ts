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
          _id,
          message,
          replacement,
          search,
          selector: mixed,
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
                  _id,
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

    function checkType(type: ts.Type, ...flags: ts.TypeFlags[]): boolean {
      return (
        flags.includes(type.getFlags()) ||
        (type.isUnion() &&
          type.types.every(subtype => flags.includes(subtype.getFlags())))
      );
    }

    function isTypeEqualsTo(type: ts.Type, expected?: Type): boolean {
      if (expected)
        switch (expected) {
          case "any":
            return type.getFlags() === ts.TypeFlags.Any;

          case "array":
            return context.checker.isArrayType(type);

          case "boolean":
            return checkType(
              type,
              ts.TypeFlags.Boolean,
              ts.TypeFlags.BooleanLike,
              ts.TypeFlags.BooleanLiteral
            );

          case "null":
            return type.getFlags() === ts.TypeFlags.Null;

          case "number":
            return checkType(
              type,
              ts.TypeFlags.Number,
              ts.TypeFlags.NumberLike,
              ts.TypeFlags.NumberLiteral
            );

          case "string":
            return checkType(
              type,
              ts.TypeFlags.String,
              ts.TypeFlags.StringLike,
              ts.TypeFlags.StringLiteral
            );

          case "symbol":
            return checkType(
              type,
              ts.TypeFlags.ESSymbol,
              ts.TypeFlags.ESSymbolLike,
              ts.TypeFlags.UniqueESSymbol
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
        _id: is.string,
        message: is.string,
        replacement: is.string,
        search: is.string,
        typeContain: isType,
        typeDontContain: isType,
        typeEq: isType,
        typeNeq: isType
      }
    );

    interface SubOptions {
      readonly _id?: string;
      readonly message?: string;
      readonly replacement?: string;
      readonly search?: string;
      readonly selector: strings | string;
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
