import path from "path";
import { is } from "@skylib/functions";
import * as _ from "@skylib/lodash-commonjs-es";
import type { TSESTree } from "@typescript-eslint/utils";
import * as utils from "./utils";

export const onlyExportName = utils.createRule({
  create(context) {
    let hasDefaultExport = false;

    const nodes = new Set<TSESTree.Identifier>();

    return {
      "Program > ExportDefaultDeclaration"(): void {
        hasDefaultExport = true;
      },
      "Program > ExportNamedDeclaration > ClassDeclaration > Identifier"(
        node: TSESTree.Identifier
      ): void {
        nodes.add(node);
      },
      "Program > ExportNamedDeclaration > FunctionDeclaration > Identifier"(
        node: TSESTree.Identifier
      ): void {
        nodes.add(node);
      },
      "Program > ExportNamedDeclaration > TSInterfaceDeclaration > Identifier"(
        node: TSESTree.Identifier
      ): void {
        nodes.add(node);
      },
      "Program > ExportNamedDeclaration > TSTypeAliasDeclaration > Identifier"(
        node: TSESTree.Identifier
      ): void {
        nodes.add(node);
      },
      "Program > ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > Identifier"(
        node: TSESTree.Identifier
      ): void {
        nodes.add(node);
      },
      "Program:exit"(): void {
        if (hasDefaultExport || nodes.size > 1) {
          // Valid
        } else
          for (const node of nodes)
            if (node.name === _.camelCase(path.parse(context.path).name)) {
              // Valid
            } else context.report({ messageId: "invalidName", node });
      }
    };
  },
  isRuleOptions: is.object,
  messages: { invalidName: "Only export should match file name" },
  name: "only-export-name"
});
