import { is } from "@skylib/functions";
import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import * as utils from "./utils";

export const classOnlyExport = utils.createRule({
  create(context) {
    const nodes = new Set<TSESTree.Node>();

    let hasClassExport = false;

    return {
      "Program > ExportAllDeclaration"(node): void {
        nodes.add(node);
      },
      "Program > ExportDefaultDeclaration"(
        node: TSESTree.ExportDefaultDeclaration
      ): void {
        if (node.declaration.type === AST_NODE_TYPES.ClassDeclaration)
          hasClassExport = true;
        else nodes.add(node);
      },
      "Program > ExportNamedDeclaration"(
        node: TSESTree.ExportNamedDeclaration
      ): void {
        if (node.declaration?.type === AST_NODE_TYPES.ClassDeclaration)
          hasClassExport = true;
        else nodes.add(node);
      },
      "Program:exit"(): void {
        if (hasClassExport && nodes.size > 0)
          for (const node of nodes)
            context.report({ messageId: "exportNotAllowed", node });
      }
    };
  },
  isRuleOptions: is.object,
  messages: { exportNotAllowed: "Export except class is not allowed" },
  name: "class-only-export"
});
