import { assert, cast, is } from "@skylib/functions";
import type { strings } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { TSESTree } from "@typescript-eslint/utils";
import * as tsutils from "tsutils";
import * as ts from "typescript";
import * as utils from "./core";

// eslint-disable-next-line @skylib/only-export-name
export class Checker<M extends string, O extends object, S extends object> {
  /**
   * Creates class instance.
   *
   * @param options - Options.
   */
  public constructor(options: Checker.Options<M, O, S>) {
    this.checker = options.context.checker;
    this.ignoreClasses = options.ignoreClasses;
    this.ignoreInterfaces = options.ignoreInterfaces;
    this.ignoreTypeParameters = options.ignoreTypeParameters ?? false;
    this.ignoreTypes = utils.createMatcher(options.ignoreTypes);
    this.readonliness = options.readonliness;
  }

  /**
   * Checks type.
   *
   * @param type - Type.
   * @param node - Node.
   * @param restElement - Rest element.
   * @returns Validation result.
   */
  public checkType(
    type: ts.Type,
    node: TSESTree.Node,
    restElement = false
  ): Checker.Result {
    if (
      node.type === AST_NODE_TYPES.TSTypeAliasDeclaration &&
      this.ignoreTypes(node.id.name)
    )
      return { passed: true };

    this.seenTypesPool.clear();

    return this.recurs(type, restElement);
  }

  protected checker: ts.TypeChecker;

  protected ignoreClasses: boolean;

  protected ignoreInterfaces: boolean;

  protected ignoreTypeParameters: boolean;

  protected ignoreTypes: utils.Matcher;

  protected readonliness: Checker.Readonliness;

  protected seenTypesPool = new Set<ts.Type>();

  /**
   * Checks mapped type nodes.
   *
   * @param type - Type.
   * @returns Validation result.
   */
  protected checkMappedTypeNodes(type: ts.Type): Checker.Result {
    const symbol = type.getSymbol();

    if (symbol) {
      const declarations = cast.not.empty(symbol.getDeclarations(), []);

      const nodes = declarations.filter(tsutils.isMappedTypeNode);

      if (nodes.length) {
        const readonly = nodes.every(node => this.readonlyMappedTypeNode(node));

        if (this.invalidReadonliness(readonly, "property"))
          return { failed: true, types: [type] };
      }
    }

    return { passed: true };
  }

  /**
   * Checks object type.
   *
   * @param type - Type.
   * @param restElement - Rest element.
   * @returns Validation result.
   */
  protected checkObjectType(
    type: ts.ObjectType,
    restElement: boolean
  ): Checker.Result {
    {
      const result = this.checkProperties(type, restElement);

      if ("failed" in result) return result;
    }

    {
      const result = this.checkSignatures(type, restElement);

      if ("failed" in result) return result;
    }

    if (tsutils.isTypeReference(type))
      return this.checkSubTypes(type, this.checker.getTypeArguments(type));

    return { passed: true };
  }

  /**
   * Checks properties.
   *
   * @param type - Type.
   * @param restElement - Rest element.
   * @returns Validation result.
   */
  protected checkProperties(
    type: ts.ObjectType,
    restElement: boolean
  ): Checker.Result {
    const isArrayProperty =
      this.checker.isArrayType(type) || this.checker.isTupleType(type)
        ? (name: string): boolean => arrayProperties.has(name)
        : (): boolean => false;

    for (const property of type.getProperties())
      if (
        property.name === "prototype" ||
        property.name.startsWith("__@") ||
        isArrayProperty(property.name)
      ) {
        // Ignore
      } else {
        if (
          !restElement &&
          this.invalidReadonliness(
            tsutils.isPropertyReadonlyInType(
              type,
              property.getEscapedName(),
              this.checker
            ),
            "property"
          )
        )
          return { failed: true, types: [type] };

        {
          const subtype = this.checker.getTypeOfPropertyOfType(
            type,
            property.name
          );

          assert.not.empty(subtype);

          const result = this.checkSubTypes(type, [subtype]);

          if ("failed" in result) return result;
        }
      }

    return { passed: true };
  }

  /**
   * Checks signatures.
   *
   * @param type - Type.
   * @param restElement - Rest element.
   * @returns Validation result.
   */
  protected checkSignatures(
    type: ts.ObjectType,
    restElement: boolean
  ): Checker.Result {
    for (const { indexKind, sourceType } of signatures) {
      const indexInfo = this.checker.getIndexInfoOfType(type, indexKind);

      if (indexInfo) {
        if (
          !restElement &&
          this.invalidReadonliness(indexInfo.isReadonly, sourceType)
        )
          return { failed: true, types: [type] };

        {
          const result = this.checkSubTypes(type, [indexInfo.type]);

          if ("failed" in result) return result;
        }
      }
    }

    return { passed: true };
  }

  /**
   * Checks subtypes.
   *
   * @param type - Type.
   * @param subtypes - Subtypes.
   * @returns Validation result.
   */
  protected checkSubTypes(
    type: ts.Type,
    subtypes: readonly ts.Type[]
  ): Checker.Result {
    for (const subtype of subtypes) {
      const result = this.recurs(subtype);

      if ("failed" in result)
        return { failed: true, types: [type, ...result.types] };
    }

    return { passed: true };
  }

  /**
   * Checks type parameter.
   *
   * @param type - Type.
   * @returns Validation result.
   */
  protected checkTypeParameter(type: ts.TypeParameter): Checker.Result {
    if (this.ignoreTypeParameters) {
      // Ignore
    } else {
      const constraint = type.getConstraint();

      if (constraint && primitiveTypes.has(constraint.getFlags())) {
        // Primitive type
      } else return { failed: true, types: [type] };
    }

    return { passed: true };
  }

  /**
   * Checks that type readonliness is invalid.
   *
   * @param typeIsReadonly - Whether type is readonly.
   * @param sourceType - Source type.
   * @returns _True_ if type readonliness is invalid, _false_ otherwise.
   */
  protected invalidReadonliness(
    typeIsReadonly: boolean,
    sourceType: Checker.SourceType
  ): boolean {
    switch (this.readonliness) {
      case "allDefinitelyReadonly":
      case "allMaybeReadonly":
        return !typeIsReadonly;

      case "allDefinitelyWritable":
      case "allMaybeWritable":
        return typeIsReadonly;

      case "numberSignatureReadonly":
        return sourceType === "numberSignature" && !typeIsReadonly;

      case "stringSignatureReadonly":
        return sourceType === "stringSignature" && !typeIsReadonly;
    }
  }

  /**
   * Checks that mapped type node is readonly.
   *
   * @param node - Node.
   * @returns _True_ if mapped type node is readonly, _false_ otherwise.
   */
  protected readonlyMappedTypeNode(node: ts.MappedTypeNode): boolean {
    if (is.not.empty(node.readonlyToken))
      switch (node.readonlyToken.kind) {
        case ts.SyntaxKind.MinusToken:
          return false;

        case ts.SyntaxKind.PlusToken:
        case ts.SyntaxKind.ReadonlyKeyword:
          return true;
      }

    switch (this.readonliness) {
      case "allDefinitelyWritable":
      case "allMaybeReadonly":
      case "numberSignatureReadonly":
      case "stringSignatureReadonly":
        return true;

      case "allDefinitelyReadonly":
      case "allMaybeWritable":
        return false;
    }
  }

  /**
   * Checks type.
   *
   * @param type - Type.
   * @param restElement - Rest element.
   * @returns Validation result.
   */
  protected recurs(type: ts.Type, restElement = false): Checker.Result {
    if (this.seenTypesPool.has(type)) return { passed: true };

    this.seenTypesPool.add(type);

    if (this.ignoreClasses && type.isClass()) return { passed: true };

    if (this.ignoreInterfaces && type.isClassOrInterface() && !type.isClass())
      return { passed: true };

    if (this.ignoreTypes(utils.getTypeName(type))) return { passed: true };

    {
      const result = this.checkMappedTypeNodes(type);

      if ("failed" in result) return result;
    }

    if (tsutils.isIntersectionType(type))
      return this.checkSubTypes(type, tsutils.intersectionTypeParts(type));

    if (tsutils.isObjectType(type))
      return this.checkObjectType(type, restElement);

    if (tsutils.isTypeParameter(type)) return this.checkTypeParameter(type);

    if (tsutils.isUnionType(type))
      return this.checkSubTypes(type, tsutils.unionTypeParts(type));

    return { passed: true };
  }
}

// eslint-disable-next-line @skylib/class-only-export
export namespace Checker {
  export interface InvalidResult {
    readonly failed: true;
    readonly types: readonly ts.Type[];
  }

  export interface Options<
    M extends string,
    O extends object,
    S extends object
  > {
    readonly context: utils.Context<M, O, S>;
    readonly ignoreClasses: boolean;
    readonly ignoreInterfaces: boolean;
    readonly ignoreTypeParameters?: boolean;
    readonly ignoreTypes: strings;
    readonly readonliness: Readonliness;
  }

  export type Readonliness =
    | "allDefinitelyReadonly"
    | "allDefinitelyWritable"
    | "allMaybeReadonly"
    | "allMaybeWritable"
    | "numberSignatureReadonly"
    | "stringSignatureReadonly";

  export type Result = InvalidResult | ValidResult;

  export type SourceType = "numberSignature" | "property" | "stringSignature";

  export interface ValidResult {
    readonly passed: true;
  }
}

const arrayProperties: ReadonlySet<string> = new Set(
  Object.getOwnPropertyNames(Array.prototype)
);

const primitiveTypes: ReadonlySet<ts.TypeFlags> = new Set([
  ts.TypeFlags.BigInt,
  ts.TypeFlags.BigIntLiteral,
  ts.TypeFlags.Boolean,
  ts.TypeFlags.BooleanLiteral,
  ts.TypeFlags.ESSymbol,
  ts.TypeFlags.Null,
  ts.TypeFlags.Number,
  ts.TypeFlags.NumberLiteral,
  ts.TypeFlags.String,
  ts.TypeFlags.StringLiteral,
  ts.TypeFlags.Undefined,
  ts.TypeFlags.UniqueESSymbol,
  ts.TypeFlags.Void
]);

const signatures: readonly Signature[] = [
  { indexKind: ts.IndexKind.Number, sourceType: "numberSignature" },
  { indexKind: ts.IndexKind.String, sourceType: "stringSignature" }
];

interface Signature {
  readonly indexKind: ts.IndexKind;
  readonly sourceType: Checker.SourceType;
}
