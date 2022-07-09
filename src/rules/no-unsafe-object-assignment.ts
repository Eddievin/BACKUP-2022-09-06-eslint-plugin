import * as ts from "typescript";
import * as tsutils from "tsutils";
import * as utils from "./utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import { is } from "@skylib/functions";

export const noUnsafeObjectAssignment = utils.createRule({
  name: "no-unsafe-object-assignment",
  isOptions: is.object,
  messages: {
    unsafeOptionalAssignment: "Unsafe optional assignment: {{name}}",
    unsafeReadonlyAssignment: "Unsafe readonly-to-mutable assignment: {{name}}"
  },
  create: (context): RuleListener => ({
    [AST_NODE_TYPES.ArrowFunctionExpression]: (node): void => {
      if (node.body.type === AST_NODE_TYPES.BlockStatement) {
        // Should be checked by ReturnStatement
      } else if (node.returnType)
        lintNodes(node.returnType.typeAnnotation, node.body, context);
      else {
        // No return type to check
      }
    },
    [AST_NODE_TYPES.AssignmentExpression]: (node): void => {
      lintNodes(node.left, node.right, context);
    },
    [AST_NODE_TYPES.CallExpression]: (node): void => {
      const tsNode = context.toTsNode(node);

      for (const arg of tsNode.arguments) lintExpression(arg, context);
    },
    [AST_NODE_TYPES.ReturnStatement]: (node): void => {
      const tsNode = context.toTsNode(node);

      if (tsNode.expression) lintExpression(tsNode.expression, context);
    },
    [AST_NODE_TYPES.VariableDeclaration]: (node): void => {
      for (const declaration of node.declarations)
        if (declaration.init)
          lintNodes(declaration.id, declaration.init, context);
    }
  })
});

type Context = utils.Context<MessageId, object, object>;

type MessageId = utils.MessageId<typeof noUnsafeObjectAssignment>;

/**
 * Lints expression.
 *
 * @param tsNode - Node.
 * @param context - Context.
 */
function lintExpression(tsNode: ts.Expression, context: Context): void {
  const destType = context.checker.getContextualType(tsNode);

  const sourceType = context.checker.getTypeAtLocation(tsNode);

  const node = context.toEsNode(tsNode);

  if (destType && node.type !== AST_NODE_TYPES.ObjectExpression)
    lintTypes(destType, sourceType, node, context);
}

/**
 * Lints nodes.
 *
 * @param dest - Dest node.
 * @param source - Source node.
 * @param context - Context.
 */
function lintNodes(
  dest: TSESTree.Node,
  source: TSESTree.Node,
  context: Context
): void {
  const tsDest = context.toTsNode(dest);

  const tsSource = context.toTsNode(source);

  const destType = context.checker.getTypeAtLocation(tsDest);

  const sourceType = context.checker.getTypeAtLocation(tsSource);

  if (source.type === AST_NODE_TYPES.ObjectExpression) {
    // Ignore
  } else lintTypes(destType, sourceType, source, context);
}

/**
 * Lints types.
 *
 * @param dest - Dest type.
 * @param source - Source type.
 * @param node - Node.
 * @param context - Context.
 */
function lintTypes(
  dest: ts.Type,
  source: ts.Type,
  node: TSESTree.Node,
  context: Context
): void {
  if (
    dest !== source &&
    tsutils.isObjectType(dest) &&
    tsutils.isObjectType(source)
  ) {
    for (const destProperty of dest.getProperties())
      if (destProperty.name.startsWith("__@")) {
        // Ignore
      } else {
        const sourceProperty = source.getProperty(destProperty.name);

        if (sourceProperty) {
          const destReadonly = tsutils.isPropertyReadonlyInType(
            dest,
            destProperty.getEscapedName(),
            context.checker
          );

          const sourceReadonly = tsutils.isPropertyReadonlyInType(
            source,
            sourceProperty.getEscapedName(),
            context.checker
          );

          if (sourceReadonly && !destReadonly) {
            context.report({
              data: { name: destProperty.name },
              messageId: "unsafeReadonlyAssignment",
              node
            });

            return;
          }
        } else {
          context.report({
            data: { name: destProperty.name },
            messageId: "unsafeOptionalAssignment",
            node
          });

          return;
        }
      }

    for (const kind of [ts.IndexKind.Number, ts.IndexKind.String]) {
      const sourceIndexInfo = context.checker.getIndexInfoOfType(source, kind);

      const destIndexInfo = context.checker.getIndexInfoOfType(dest, kind);

      if (
        sourceIndexInfo &&
        destIndexInfo &&
        sourceIndexInfo.isReadonly &&
        !destIndexInfo.isReadonly
      ) {
        context.report({
          data: { name: "Index signature" },
          messageId: "unsafeReadonlyAssignment",
          node
        });

        return;
      }
    }
  }
}
