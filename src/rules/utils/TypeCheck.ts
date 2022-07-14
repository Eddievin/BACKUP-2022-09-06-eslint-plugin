/* eslint-disable @skylib/custom -- Wait for @skylib/config update */

/* eslint-disable @skylib/require-jsdoc -- Postponed */

import * as ts from "typescript";
import * as tsutils from "tsutils";
import type { ParserServices, TSESTree } from "@typescript-eslint/utils";
import { ReadonlySet, as, assert, is } from "@skylib/functions";
import type { NumStrU } from "@skylib/functions";
import { TypeGroup } from "./types";
import type { TypeGroups } from "./types";

export class TypeCheck {
  /**
   * Checks if type is boolean.
   *
   * @param type - Type.
   * @returns _True_ if type is boolean, _false_ otherwise.
   */
  public readonly isBoolish = (type: ts.Type): boolean => {
    if (safeTypes.has(type.getFlags())) return true;

    if (tsutils.isUnionType(type)) {
      const parts = tsutils.unionTypeParts(type);

      if (parts.length === 2) {
        if (
          parts.some(part => tsutils.isBooleanLiteralType(part, true)) &&
          parts.some(part => tsutils.isBooleanLiteralType(part, false))
        )
          return true;

        if (
          parts.some(part => tsutils.isBooleanLiteralType(part, true)) &&
          parts.some(part => part.getFlags() === ts.TypeFlags.Undefined)
        )
          return true;

        if (
          parts.some(part => tsutils.isObjectType(part)) &&
          parts.some(part => part.getFlags() === ts.TypeFlags.Undefined)
        )
          return true;

        if (
          parts.some(part => safeTypesWithUndefined.has(part.getFlags())) &&
          parts.some(part => part.getFlags() === ts.TypeFlags.Undefined)
        )
          return true;
      }
    }

    return false;
  };

  /**
   * Creates class instance.
   *
   * @param checker - Checker.
   * @param toTsNode - Converter.
   */
  public constructor(
    checker: ts.TypeChecker,
    toTsNode: ParserServices["esTreeNodeToTSNodeMap"]["get"]
  ) {
    this.checker = checker;
    this.toTsNode = toTsNode;
  }

  /**
   * Checks if node is an array.
   *
   * @param node - Node.
   * @returns _True_ if node is an array, _false_ otherwise.
   */
  public getCallSignatures(node: TSESTree.Node): TypeCheck.Signatures {
    const tsNode = this.toTsNode(node);

    const type = this.checker.getTypeAtLocation(tsNode);

    return this.checker.getSignaturesOfType(type, ts.SignatureKind.Call);
  }

  public getType(node: TSESTree.Node): ts.Type {
    const tsNode = this.toTsNode(node);

    return this.checker.getTypeAtLocation(tsNode);
  }

  /**
   * Checks if node is an array.
   *
   * @param node - Node.
   * @returns _True_ if node is an array, _false_ otherwise.
   */
  public isArray(node: TSESTree.Node): boolean {
    const tsNode = this.toTsNode(node);

    const type = this.checker.getTypeAtLocation(tsNode);

    return this.checker.isArrayType(type);
  }

  /**
   * Gets type parts.
   *
   * @param node - Node.
   * @returns Type parts.
   */
  public parseUnionType(node: TSESTree.Node): TypeCheck.TypeParts {
    return recurs(this.checker.getTypeAtLocation(this.toTsNode(node)));

    function recurs(type: ts.Type): TypeCheck.TypeParts {
      if (type.isNumberLiteral()) return [type.value];

      if (type.isStringLiteral()) return [type.value];

      if (type.isUnion())
        return tsutils.unionTypeParts(type).flatMap(part => recurs(part));

      return [type];
    }
  }

  /**
   * Gets type parts.
   *
   * @param node - Node.
   * @returns Type parts.
   */
  public parseUnionTypeTypeofFix(node: TSESTree.Node): TypeCheck.TypeParts {
    return node.type === "UnaryExpression" && node.operator === "typeof"
      ? recurs(this.checker.getTypeAtLocation(this.toTsNode(node.argument)))
      : this.parseUnionType(node);

    function recurs(type: ts.Type): TypeCheck.TypeParts {
      if (type.getCallSignatures().length) return ["function"];

      if (type.getConstructSignatures().length) return ["function"];

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

  public typeHas(type: ts.Type, expected?: TypeGroup): boolean {
    return expected
      ? this.typeIs(type, expected) ||
          (type.isUnion() &&
            type.types.some(subtype => this.typeIs(subtype, expected)))
      : true;
  }

  public typeHasNoneOf(type: ts.Type, expected?: TypeGroups): boolean {
    return expected ? expected.every(x => this.typeHasNot(type, x)) : true;
  }

  public typeHasNot(type: ts.Type, expected?: TypeGroup): boolean {
    return expected ? !this.typeHas(type, expected) : true;
  }

  public typeHasOneOf(type: ts.Type, expected?: TypeGroups): boolean {
    return expected ? expected.some(x => this.typeHas(type, x)) : true;
  }

  public typeIs(type: ts.Type, expected?: TypeGroup): boolean {
    if (expected)
      switch (expected) {
        case "any":
          return this.zzz(type, ts.TypeFlags.Any);

        case "array":
          return (
            this.zzz(type, ts.TypeFlags.NonPrimitive, ts.TypeFlags.Object) &&
            this.checker.isArrayType(type)
          );

        case "boolean":
          return this.zzz(
            type,
            ts.TypeFlags.Boolean,
            ts.TypeFlags.BooleanLike,
            ts.TypeFlags.BooleanLiteral
          );

        case "complex":
          if (
            this.checker.isArrayType(type) ||
            this.checker.isTupleType(type)
          ) {
            const subtypes = type.typeArguments;

            assert.not.empty(subtypes, "Missing type arguments");

            return subtypes.some(subtype => this.typeIs(subtype, expected));
          }

          if (type.isUnionOrIntersection())
            return type.types.some(subtype => this.typeIs(subtype, expected));

          return type.getSymbol()?.name === "__object";

        case "function":
          return (
            this.zzz(type, ts.TypeFlags.NonPrimitive, ts.TypeFlags.Object) &&
            type.getCallSignatures().length > 0
          );

        case "null":
          return this.zzz(type, ts.TypeFlags.Null);

        case "number":
          return this.zzz(
            type,
            ts.TypeFlags.Number,
            ts.TypeFlags.NumberLike,
            ts.TypeFlags.NumberLiteral
          );

        case "object":
          return (
            this.zzz(type, ts.TypeFlags.NonPrimitive, ts.TypeFlags.Object) &&
            !this.typeIs(type, TypeGroup.array) &&
            !this.typeIs(type, TypeGroup.function)
          );

        case "readonly":
          return type
            .getProperties()
            .some(property =>
              tsutils.isPropertyReadonlyInType(
                type,
                property.getEscapedName(),
                this.checker
              )
            );

        case "string":
          return this.zzz(
            type,
            ts.TypeFlags.String,
            ts.TypeFlags.StringLike,
            ts.TypeFlags.StringLiteral
          );

        case "symbol":
          return this.zzz(
            type,
            ts.TypeFlags.ESSymbol,
            ts.TypeFlags.ESSymbolLike,
            ts.TypeFlags.UniqueESSymbol
          );

        case "tuple":
          return (
            this.zzz(type, ts.TypeFlags.NonPrimitive, ts.TypeFlags.Object) &&
            this.checker.isTupleType(type)
          );

        case "undefined":
          return this.zzz(type, ts.TypeFlags.Undefined);

        case "unknown":
          return this.zzz(type, ts.TypeFlags.Unknown);
      }

    return true;
  }

  public typeIsNoneOf(type: ts.Type, expected?: TypeGroups): boolean {
    return expected ? expected.every(x => this.typeIsNot(type, x)) : true;
  }

  public typeIsNot(type: ts.Type, expected?: TypeGroup): boolean {
    return expected ? !this.typeIs(type, expected) : true;
  }

  public typeIsOneOf(type: ts.Type, expected?: TypeGroups): boolean {
    return expected ? expected.some(x => this.typeIs(type, x)) : true;
  }

  protected readonly checker: ts.TypeChecker;

  protected readonly toTsNode: ParserServices["esTreeNodeToTSNodeMap"]["get"];

  protected readonly zzz = (
    type: ts.Type,
    ...flags: readonly ts.TypeFlags[]
  ): boolean => {
    if (type.isTypeParameter()) {
      const constraint = type.getConstraint();

      if (is.not.empty(constraint)) type = constraint;
      else return flags.includes(ts.TypeFlags.Unknown);
    }

    return (
      flags.includes(type.getFlags()) ||
      (type.isUnion() &&
        type.types.every(subtype => flags.includes(subtype.getFlags())))
    );
  };
}

export namespace TypeCheck {
  export type Signatures = readonly ts.Signature[];

  export type TypePart = NumStrU | ts.Type;

  export type TypeParts = readonly TypePart[];
}

const safeTypes = new ReadonlySet([
  ts.TypeFlags.BigInt,
  ts.TypeFlags.BigIntLiteral,
  ts.TypeFlags.Boolean,
  ts.TypeFlags.BooleanLiteral,
  ts.TypeFlags.Number,
  ts.TypeFlags.NumberLiteral,
  ts.TypeFlags.String,
  ts.TypeFlags.StringLiteral
]);

const safeTypesWithUndefined = new ReadonlySet([
  ts.TypeFlags.ESSymbol,
  ts.TypeFlags.Object,
  ts.TypeFlags.NonPrimitive,
  ts.TypeFlags.UniqueESSymbol
]);

const isExpectedFlags: is.Guard<ExpectedFlags> = is.factory(is.enumeration, {
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
} as const);

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
