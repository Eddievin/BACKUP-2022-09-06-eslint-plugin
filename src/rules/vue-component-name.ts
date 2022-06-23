import * as utils from "./utils";
import { is } from "@skylib/functions";
import * as _ from "@skylib/lodash-commonjs-es";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import path from "node:path";

export const vueComponentName = utils.createRule({
  create: context => {
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
  },
  defaultOptions: { prefix: "", suffix: "" },
  isRuleOptions: is.object.factory(
    { prefix: is.string, suffix: is.string },
    {}
  ),
  messages: { invalidName: "Export name should match file name" },
  name: "vue-component-name"
});
