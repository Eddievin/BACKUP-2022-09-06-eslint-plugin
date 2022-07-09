import * as _ from "@skylib/lodash-commonjs-es";
import * as utils from "./utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import { is } from "@skylib/functions";
import path from "node:path";

export const vueComponentName = utils.createRule({
  name: "vue-component-name",
  isOptions: is.object.factory({ prefix: is.string, suffix: is.string }, {}),
  defaultOptions: { prefix: "", suffix: "" },
  messages: { invalidName: "Export name should match file name" },
  create: (context): RuleListener => {
    const { prefix, suffix } = context.options;

    return {
      [AST_NODE_TYPES.CallExpression]: (node): void => {
        if (
          node.callee.type === AST_NODE_TYPES.Identifier &&
          node.callee.name === "defineComponent"
        ) {
          const argument = node.arguments[0];

          if (argument && argument.type === AST_NODE_TYPES.ObjectExpression)
            for (const property of argument.properties)
              if (
                property.type === AST_NODE_TYPES.Property &&
                property.key.type === AST_NODE_TYPES.Identifier &&
                property.key.name === "name" &&
                property.value.type === AST_NODE_TYPES.Literal
              )
                if (
                  property.value.value ===
                  prefix + _.kebabCase(path.parse(context.path).name) + suffix
                ) {
                  // Valid
                } else
                  context.report({
                    messageId: "invalidName",
                    node: property.value
                  });
        }
      }
    };
  }
});
