import path from "path";
import * as is from "@skylib/functions/dist/guards";
import type { TSESTree } from "@typescript-eslint/utils";
import * as utils from "./utils";

const rule = utils.createRule({
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

export = rule;
