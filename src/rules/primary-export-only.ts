import * as utils from "./utils";
import { a, is } from "@skylib/functions";
import * as _ from "@skylib/lodash-commonjs-es";
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
        const primary = a
          .fromIterable(identifiers.values())
          .find(
            node =>
              _.kebabCase(node.name) ===
              _.kebabCase(path.parse(context.path).name)
          );

        if (primary) {
          for (const node of exportDefaultDeclarations)
            context.report({ messageId: "invalidExport", node });

          for (const node of identifiers)
            if (node.name === primary.name) {
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
