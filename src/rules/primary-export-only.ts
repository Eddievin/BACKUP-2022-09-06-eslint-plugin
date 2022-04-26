import * as utils from "./utils";
import { a, is } from "@skylib/functions";
import path from "path";
import type { TSESTree } from "@typescript-eslint/utils";

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
      "Program > ExportNamedDeclaration > ClassDeclaration > Identifier.id"(
        node: TSESTree.Identifier
      ): void {
        identifiers.add(node);
      },
      "Program > ExportNamedDeclaration > ExportSpecifier > Identifier.exported"(
        node: TSESTree.Identifier
      ): void {
        identifiers.add(node);
      },
      "Program > ExportNamedDeclaration > FunctionDeclaration > Identifier.id"(
        node: TSESTree.Identifier
      ): void {
        identifiers.add(node);
      },
      "Program > ExportNamedDeclaration > TSInterfaceDeclaration > Identifier.id"(
        node: TSESTree.Identifier
      ): void {
        identifiers.add(node);
      },
      "Program > ExportNamedDeclaration > TSModuleDeclaration > Identifier.id"(
        node: TSESTree.Identifier
      ): void {
        identifiers.add(node);
      },
      "Program > ExportNamedDeclaration > TSTypeAliasDeclaration > Identifier.id"(
        node: TSESTree.Identifier
      ): void {
        identifiers.add(node);
      },
      "Program > ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > Identifier.id"(
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
