import { is } from "@skylib/functions";
import * as _ from "@skylib/lodash-commonjs-es";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import * as utils from "./utils";

export const exportAllName = utils.createRule({
  create(context) {
    return {
      [AST_NODE_TYPES.ExportAllDeclaration](node): void {
        if (node.exported && node.source)
          if (node.exported.name === _.camelCase(node.source.value)) {
            // Valid
          } else context.report({ messageId: "invalidName", node });
      }
    };
  },
  isRuleOptions: is.object,
  messages: { invalidName: "Export name should match file name" },
  name: "export-all-name"
});
