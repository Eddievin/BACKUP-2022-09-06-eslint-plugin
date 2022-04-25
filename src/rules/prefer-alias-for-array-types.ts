import { is } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import * as utils from "./utils";

export const preferAliasForArrayTypes = utils.createRule({
  create(context) {
    return {
      [AST_NODE_TYPES.TSTypeAnnotation](node): void {
        const tsNode = context.toTsNode(node.typeAnnotation);

        const type = context.checker.getTypeAtLocation(tsNode);

        if (
          context.checker.isArrayType(type) &&
          type.typeArguments &&
          type.typeArguments.every(subtype => subtype.isTypeParameter())
        ) {
          // Valid
        } else context.report({ messageId: "preferAlias", node });
      }
    };
  },
  isRuleOptions: is.object,
  messages: { preferAlias: "Define alias for array type" },
  name: "prefer-alias-for-array-types"
});
