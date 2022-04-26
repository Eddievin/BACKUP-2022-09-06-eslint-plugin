import * as utils from "./utils";
import { is } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { stringU } from "@skylib/functions";
import type { TSESTree } from "@typescript-eslint/utils";

export const classOnlyExport = utils.createRule({
  create(context) {
    const exportAllDeclarations: TSESTree.ExportAllDeclaration[] = [];

    const exportDefaultDeclaration: TSESTree.ExportDefaultDeclaration[] = [];

    const identifiers: TSESTree.Identifier[] = [];

    let className: stringU;

    return {
      "Program > ExportAllDeclaration"(
        node: TSESTree.ExportAllDeclaration
      ): void {
        if (is.empty(node.exported)) exportAllDeclarations.push(node);
      },
      "Program > ExportAllDeclaration > Identifier"(
        node: TSESTree.Identifier
      ): void {
        identifiers.push(node);
      },
      "Program > ExportDefaultDeclaration"(
        node: TSESTree.ExportDefaultDeclaration
      ): void {
        if (
          node.declaration.type === AST_NODE_TYPES.ClassDeclaration &&
          node.declaration.id
        )
          className = node.declaration.id.name;
        else exportDefaultDeclaration.push(node);
      },
      "Program > ExportNamedDeclaration > ClassDeclaration > Identifier.id"(
        node: TSESTree.Identifier
      ): void {
        className = node.name;
      },
      "Program > ExportNamedDeclaration > ExportSpecifier > Identifier.exported"(
        node: TSESTree.Identifier
      ): void {
        identifiers.push(node);
      },
      "Program > ExportNamedDeclaration > FunctionDeclaration > Identifier.id"(
        node: TSESTree.Identifier
      ): void {
        identifiers.push(node);
      },
      "Program > ExportNamedDeclaration > TSInterfaceDeclaration > Identifier.id"(
        node: TSESTree.Identifier
      ): void {
        identifiers.push(node);
      },
      "Program > ExportNamedDeclaration > TSModuleDeclaration > Identifier.id"(
        node: TSESTree.Identifier
      ): void {
        identifiers.push(node);
      },
      "Program > ExportNamedDeclaration > TSTypeAliasDeclaration > Identifier.id"(
        node: TSESTree.Identifier
      ): void {
        identifiers.push(node);
      },
      "Program > ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > Identifier.id"(
        node: TSESTree.Identifier
      ): void {
        identifiers.push(node);
      },
      "Program:exit"(): void {
        if (is.not.empty(className)) {
          const nodes = [
            ...exportAllDeclarations,
            ...exportDefaultDeclaration,
            ...identifiers.filter(node => node.name !== className)
          ];

          if (nodes.length)
            for (const node of nodes)
              context.report({ messageId: "exportNotAllowed", node });
        }
      }
    };
  },
  isRuleOptions: is.object,
  messages: { exportNotAllowed: "Export except class is not allowed" },
  name: "class-only-export"
});
