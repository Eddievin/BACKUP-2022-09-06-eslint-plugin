import * as ts from "typescript";
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
  create: (context, typeCheck): RuleListener => {
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
        for (const arg of node.arguments) lintExpression(arg);
      },
      ReturnStatement: (node): void => {
        if (node.argument) lintExpression(node.argument);
      },
      VariableDeclaration: (node): void => {
        for (const declaration of node.declarations)
          if (declaration.init) lintNodes(declaration.id, declaration.init);
      }
    };

    function lintExpression(node: TSESTree.CallExpressionArgument): void {
      const destType = typeCheck.getContextualType(node);

      const sourceType = typeCheck.getType(node);

      if (destType && node.type !== AST_NODE_TYPES.ObjectExpression)
        lintTypes(destType, sourceType, node);
    }

    function lintNodes(dest: TSESTree.Node, source: TSESTree.Node): void {
      const destType = typeCheck.getType(dest);

      const sourceType = typeCheck.getType(source);

      if (source.type === AST_NODE_TYPES.ObjectExpression) {
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
        typeCheck.isObjectType(dest) &&
        typeCheck.isObjectType(source)
      ) {
        for (const destProperty of dest.getProperties())
          if (destProperty.name.startsWith("__@")) {
            // Ignore
          } else {
            const sourceProperty = source.getProperty(destProperty.name);

            if (sourceProperty) {
              const destReadonly = typeCheck.isReadonlyProperty(
                destProperty,
                dest
              );

              const sourceReadonly = typeCheck.isReadonlyProperty(
                sourceProperty,
                source
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
          const sourceIndex = typeCheck.getIndexInfo(source, kind);

          const destIndex = typeCheck.getIndexInfo(dest, kind);

          if (
            sourceIndex &&
            destIndex &&
            sourceIndex.isReadonly &&
            !destIndex.isReadonly
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
