import * as ts from "typescript";
import * as tsutils from "tsutils";
import * as utils from "./utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import { is } from "@skylib/functions";

export const arrayCallbackReturnType = utils.createRule({
  create: (context): RuleListener => ({
    [AST_NODE_TYPES.CallExpression]: (node): void => {
      if (
        node.callee.type === AST_NODE_TYPES.MemberExpression &&
        node.callee.property.type === AST_NODE_TYPES.Identifier &&
        methods.has(node.callee.property.name) &&
        isArray(node.callee.object, context)
      ) {
        const argument = node.arguments[0];

        if (argument) {
          const tsArgument = context.toTsNode(argument);

          const type = context.checker.getTypeAtLocation(tsArgument);

          const signatures = context.checker.getSignaturesOfType(
            type,
            ts.SignatureKind.Call
          );

          if (
            signatures.every(signature =>
              isBoolean(context.checker.getReturnTypeOfSignature(signature))
            )
          ) {
            // Ok
          } else
            context.report({
              messageId: "expectingBooleanReturnType",
              node: argument
            });
        }
      }
    }
  }),
  isRuleOptions: is.object,
  messages: { expectingBooleanReturnType: "Expecting boolean return type" },
  name: "array-callback-return-type"
});

const methods: ReadonlySet<string> = new Set(["some", "every"]);

const safeTypes: ReadonlySet<ts.TypeFlags> = new Set([
  ts.TypeFlags.BigInt,
  ts.TypeFlags.BigIntLiteral,
  ts.TypeFlags.Boolean,
  ts.TypeFlags.BooleanLiteral,
  ts.TypeFlags.Number,
  ts.TypeFlags.NumberLiteral,
  ts.TypeFlags.String,
  ts.TypeFlags.StringLiteral
]);

const safeTypesWithUndefined: ReadonlySet<ts.TypeFlags> = new Set([
  ts.TypeFlags.ESSymbol,
  ts.TypeFlags.Object,
  ts.TypeFlags.NonPrimitive,
  ts.TypeFlags.UniqueESSymbol
]);

type Context = utils.Context<MessageId, object, object>;

type MessageId = utils.MessageId<typeof arrayCallbackReturnType>;

/**
 * Checks if node is an array.
 *
 * @param node - Node.
 * @param context - Context.
 * @returns _True_ if node is an array, _false_ otherwise.
 */
function isArray(node: TSESTree.Node, context: Context): boolean {
  const tsNode = context.toTsNode(node);

  const type = context.checker.getTypeAtLocation(tsNode);

  return context.checker.isArrayType(type);
}

/**
 * Checks if type is boolean.
 *
 * @param type - Type.
 * @returns _True_ if type is boolean, _false_ otherwise.
 */
function isBoolean(type: ts.Type): boolean {
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
}
