import { as, createValidationObject, is, o } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import * as tsutils from "tsutils";
import * as ts from "typescript";
import type { Context } from "./types";
import type { NumStrU } from "@skylib/functions";
import type { TSESTree } from "@typescript-eslint/utils";

/**
 * Gets type parts.
 *
 * @param node - Node.
 * @param context - Context.
 * @returns Type parts.
 */
export const getTypeParts = o.extend(
  <M extends string, O extends object, S extends object>(
    node: TSESTree.Node,
    context: Context<M, O, S>
  ): readonly TypePart[] => {
    return recurs(context.checker.getTypeAtLocation(context.toTsNode(node)));

    function recurs(type: ts.Type): readonly TypePart[] {
      if (type.isNumberLiteral()) return [type.value];

      if (type.isStringLiteral()) return [type.value];

      if (type.isUnion())
        return tsutils.unionTypeParts(type).flatMap(part => recurs(part));

      return [type];
    }
  },
  {
    /**
     * Gets type parts.
     *
     * @param node - Node.
     * @param context - Context.
     * @returns Type parts.
     */
    typeofFix: <M extends string, O extends object, S extends object>(
      node: TSESTree.Node,
      context: Context<M, O, S>
    ) => {
      return node.type === AST_NODE_TYPES.UnaryExpression &&
        node.operator === "typeof"
        ? recurs(
            context.checker.getTypeAtLocation(context.toTsNode(node.argument))
          )
        : getTypeParts(node, context);

      function recurs(type: ts.Type): readonly TypePart[] {
        if (type.getCallSignatures().length > 0) return ["function"];

        if (type.getConstructSignatures().length > 0) return ["function"];

        if (type.isUnion())
          return tsutils.unionTypeParts(type).flatMap(part => recurs(part));

        switch (as.byGuard(type.flags, isExpectedFlags)) {
          case ts.TypeFlags.BigInt:
          case ts.TypeFlags.BigIntLiteral:
            return ["bigint"];

          case ts.TypeFlags.BooleanLiteral:
            return ["boolean"];

          case ts.TypeFlags.Number:
          case ts.TypeFlags.NumberLiteral:
            return ["number"];

          case ts.TypeFlags.Null:
          case ts.TypeFlags.Object:
            return ["object"];

          case ts.TypeFlags.String:
          case ts.TypeFlags.StringLiteral:
            return ["string"];

          case ts.TypeFlags.ESSymbol:
          case ts.TypeFlags.UniqueESSymbol:
            return ["symbol"];

          case ts.TypeFlags.Undefined:
          case ts.TypeFlags.Void:
            return ["undefined"];
        }
      }
    }
  }
);

export type TypePart = NumStrU | ts.Type;

const ExpectedFlagsVO = createValidationObject<ExpectedFlags>({
  [ts.TypeFlags.BigInt]: ts.TypeFlags.BigInt,
  [ts.TypeFlags.BigIntLiteral]: ts.TypeFlags.BigIntLiteral,
  [ts.TypeFlags.BooleanLiteral]: ts.TypeFlags.BooleanLiteral,
  [ts.TypeFlags.ESSymbol]: ts.TypeFlags.ESSymbol,
  [ts.TypeFlags.Null]: ts.TypeFlags.Null,
  [ts.TypeFlags.Number]: ts.TypeFlags.Number,
  [ts.TypeFlags.NumberLiteral]: ts.TypeFlags.NumberLiteral,
  [ts.TypeFlags.Object]: ts.TypeFlags.Object,
  [ts.TypeFlags.String]: ts.TypeFlags.String,
  [ts.TypeFlags.StringLiteral]: ts.TypeFlags.StringLiteral,
  [ts.TypeFlags.Undefined]: ts.TypeFlags.Undefined,
  [ts.TypeFlags.UniqueESSymbol]: ts.TypeFlags.UniqueESSymbol,
  [ts.TypeFlags.Void]: ts.TypeFlags.Void
});

const isExpectedFlags: is.Guard<ExpectedFlags> = is.factory(
  is.enumeration,
  ExpectedFlagsVO
);

type ExpectedFlags =
  | ts.TypeFlags.BigInt
  | ts.TypeFlags.BigIntLiteral
  | ts.TypeFlags.BooleanLiteral
  | ts.TypeFlags.ESSymbol
  | ts.TypeFlags.Null
  | ts.TypeFlags.Number
  | ts.TypeFlags.NumberLiteral
  | ts.TypeFlags.Object
  | ts.TypeFlags.String
  | ts.TypeFlags.StringLiteral
  | ts.TypeFlags.Undefined
  | ts.TypeFlags.UniqueESSymbol
  | ts.TypeFlags.Void;
