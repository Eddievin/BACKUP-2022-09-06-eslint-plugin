import path from "path";
import { is } from "@skylib/functions";
import type { TSESTree } from "@typescript-eslint/utils";
import * as utils from "./utils";

export const className = utils.createRule({
  create(context) {
    return {
      "ExportNamedDeclaration > ClassDeclaration"(
        node: TSESTree.ClassDeclaration
      ): void {
        if (node.id)
          if (node.id.name === path.parse(context.path).name) {
            // Valid
          } else context.report({ messageId: "invalidClassName", node });
      }
    };
  },
  isRuleOptions: is.object,
  messages: { invalidClassName: "Class name should match file name" },
  name: "class-name"
});
