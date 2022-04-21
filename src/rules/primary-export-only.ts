import path from "path";
import { a, is } from "@skylib/functions";
import type { TSESTree } from "@typescript-eslint/utils";
import * as utils from "./utils";

export const primaryExportOnly = utils.createRule({
  create(context) {
    const exportDefaultDeclarations =
      new Set<TSESTree.ExportDefaultDeclaration>();

    const identifiers = new Set<TSESTree.Identifier>();

    return {
      "Program > ExportDefaultDeclaration"(
        node: TSESTree.ExportDefaultDeclaration
      ): void {
        exportDefaultDeclarations.add(node);
      },
      "Program > ExportNamedDeclaration > ClassDeclaration > Identifier"(
        node: TSESTree.Identifier
      ): void {
        identifiers.add(node);
      },
      "Program > ExportNamedDeclaration > FunctionDeclaration > Identifier"(
        node: TSESTree.Identifier
      ): void {
        identifiers.add(node);
      },
      "Program > ExportNamedDeclaration > TSInterfaceDeclaration > Identifier"(
        node: TSESTree.Identifier
      ): void {
        identifiers.add(node);
      },
      "Program > ExportNamedDeclaration > TSTypeAliasDeclaration > Identifier"(
        node: TSESTree.Identifier
      ): void {
        identifiers.add(node);
      },
      "Program > ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > Identifier"(
        node: TSESTree.Identifier
      ): void {
        identifiers.add(node);
      },
      "Program:exit"(): void {
        if (
          a
            .fromIterable(identifiers.values())
            .some(node => node.name === path.parse(context.path).name)
        ) {
          for (const node of exportDefaultDeclarations)
            context.report({ messageId: "invalidExport", node });

          for (const node of identifiers)
            if (node.name === path.parse(context.path).name) {
              // Valid
            } else context.report({ messageId: "invalidExport", node });
        }
      }
    };
  },
  isRuleOptions: is.object,
  messages: {
    invalidExport:
      "Additional export is not allowed when there is export matching file name"
  },
  name: "primary-export-only"
});
