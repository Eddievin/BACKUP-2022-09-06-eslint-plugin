import * as ts from "typescript";
import * as tsutils from "tsutils";
import * as utils from "./utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";

export enum MessageId {
  unsafeOptionalAssignment = "unsafeOptionalAssignment",
  unsafeReadonlyAssignment = "unsafeReadonlyAssignment"
}

export const noUnsafeObjectAssignment = utils.createRule({
  name: "no-unsafe-object-assignment",
  messages: {
    [MessageId.unsafeOptionalAssignment]:
      "Unsafe optional assignment: {{name}}",
    [MessageId.unsafeReadonlyAssignment]:
      "Unsafe readonly-to-mutable assignment: {{name}}"
  },
  create: (context): RuleListener => {
    return {
      ArrowFunctionExpression: (node): void => {
        if (node.body.type === AST_NODE_TYPES.BlockStatement) {
          // Should be checked by ReturnStatement
        } else if (node.returnType)
          lintNodes(node.returnType.typeAnnotation, node.body);
        else {
          // No return type to check
        }
      },
      AssignmentExpression: (node): void => {
        lintNodes(node.left, node.right);
      },
      CallExpression: (node): void => {
        const tsNode = context.toTsNode(node);

        for (const arg of tsNode.arguments) lintExpression(arg);
      },
      ReturnStatement: (node): void => {
        const tsNode = context.toTsNode(node);

        if (tsNode.expression) lintExpression(tsNode.expression);
      },
      VariableDeclaration: (node): void => {
        for (const declaration of node.declarations)
          if (declaration.init) lintNodes(declaration.id, declaration.init);
      }
    };

    function lintExpression(tsNode: ts.Expression): void {
      const destType = context.checker.getContextualType(tsNode);

      const sourceType = context.checker.getTypeAtLocation(tsNode);

      const node = context.toEsNode(tsNode);

      if (destType && node.type !== "ObjectExpression")
        lintTypes(destType, sourceType, node);
    }

    function lintNodes(dest: TSESTree.Node, source: TSESTree.Node): void {
      const tsDest = context.toTsNode(dest);

      const tsSource = context.toTsNode(source);

      const destType = context.checker.getTypeAtLocation(tsDest);

      const sourceType = context.checker.getTypeAtLocation(tsSource);

      if (source.type === "ObjectExpression") {
        // Ignore
      } else lintTypes(destType, sourceType, source);
    }

    function lintTypes(
      dest: ts.Type,
      source: ts.Type,
      node: TSESTree.Node
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
                  messageId: MessageId.unsafeReadonlyAssignment,
                  node
                });

                return;
              }
            } else {
              context.report({
                data: { name: destProperty.name },
                messageId: MessageId.unsafeOptionalAssignment,
                node
              });

              return;
            }
          }

        for (const kind of [ts.IndexKind.Number, ts.IndexKind.String]) {
          const sourceIndexInfo = context.checker.getIndexInfoOfType(
            source,
            kind
          );

          const destIndexInfo = context.checker.getIndexInfoOfType(dest, kind);

          if (
            sourceIndexInfo &&
            destIndexInfo &&
            sourceIndexInfo.isReadonly &&
            !destIndexInfo.isReadonly
          ) {
            context.report({
              data: { name: "Index signature" },
              messageId: MessageId.unsafeReadonlyAssignment,
              node
            });

            return;
          }
        }
      }
    }
  }
});
