import * as utils from "./utils";
import { is } from "@skylib/functions";
import path from "node:path";
import type { TSESTree } from "@typescript-eslint/utils";

export const className = utils.createRule({
  create: context => {
    return {
      "ExportNamedDeclaration > ClassDeclaration": (
        node: TSESTree.ClassDeclaration
      ): void => {
        if (node.id)
          if (node.id.name === path.parse(context.path).name) {
            // Valid
          } else
            context.report({ messageId: "invalidClassName", node: node.id });
      }
    };
  },
  isRuleOptions: is.object,
  messages: { invalidClassName: "Class name should match file name" },
  name: "class-name"
});
