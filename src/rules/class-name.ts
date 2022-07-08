import * as utils from "./utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import { is } from "@skylib/functions";
import path from "node:path";

export const className = utils.createRule({
  create: (context): RuleListener => ({
    "ExportNamedDeclaration > ClassDeclaration": (
      node: TSESTree.ClassDeclaration
    ): void => {
      if (node.id)
        if (node.id.name === path.parse(context.path).name) {
          // Valid
        } else context.report({ messageId: "invalidClassName", node: node.id });
    }
  }),
  isRuleOptions: is.object,
  messages: { invalidClassName: "Class name should match file name" },
  name: "class-name"
});
