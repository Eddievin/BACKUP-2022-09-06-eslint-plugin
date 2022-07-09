import * as utils from "./utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import { is } from "@skylib/functions";

export const onlyExportName = utils.createRule({
  name: "only-export-name",
  isOptions: is.object,
  messages: { invalidName: "Only export should match file name" },
  create: (context): RuleListener => {
    let hasDefaultExport = false;

    const nodes = new Set<TSESTree.Identifier>();

    return {
      "Program > ExportDefaultDeclaration": (): void => {
        hasDefaultExport = true;
      },
      "Program > ExportNamedDeclaration > ClassDeclaration > Identifier.id": (
        node: TSESTree.Identifier
      ): void => {
        nodes.add(node);
      },
      "Program > ExportNamedDeclaration > ExportSpecifier > Identifier.exported":
        (node: TSESTree.Identifier): void => {
          nodes.add(node);
        },
      "Program > ExportNamedDeclaration > FunctionDeclaration > Identifier.id":
        (node: TSESTree.Identifier): void => {
          nodes.add(node);
        },
      "Program > ExportNamedDeclaration > TSInterfaceDeclaration > Identifier.id":
        (node: TSESTree.Identifier): void => {
          nodes.add(node);
        },
      "Program > ExportNamedDeclaration > TSModuleDeclaration > Identifier.id":
        (node: TSESTree.Identifier): void => {
          nodes.add(node);
        },
      "Program > ExportNamedDeclaration > TSTypeAliasDeclaration > Identifier.id":
        (node: TSESTree.Identifier): void => {
          nodes.add(node);
        },
      "Program > ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > Identifier.id":
        (node: TSESTree.Identifier): void => {
          nodes.add(node);
        },
      "Program:exit": (): void => {
        if (hasDefaultExport || nodes.size > 1) {
          // Valid
        } else
          for (const node of nodes) {
            const expected = utils.getNameFromFilename(context.path, node.name);

            if (node.name === "default" || node.name === expected) {
              // Valid
            } else context.report({ messageId: "invalidName", node });
          }
      }
    };
  }
});
