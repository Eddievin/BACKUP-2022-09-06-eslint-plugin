import * as utils from "./utils";
import { is } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import * as ts from "typescript";

export const preferAliasForArrayTypes = utils.createRule({
  create: context => {
    return {
      [AST_NODE_TYPES.TSTypeAnnotation]: (node): void => {
        if (node.typeAnnotation.type === AST_NODE_TYPES.TSTypeReference) {
          // Valid
        } else {
          const tsNode = context.toTsNode(node.typeAnnotation);

          const type = context.checker.getTypeAtLocation(tsNode);

          if (context.checker.isArrayType(type)) {
            const args = type.typeArguments ?? [];

            if (
              args.every(subtype => subtype.isTypeParameter()) ||
              args.every(subtype => subtype.flags === ts.TypeFlags.Any)
            ) {
              // Valid
            } else context.report({ messageId: "preferAlias", node });
          }
        }
      }
    };
  },
  isRuleOptions: is.object,
  messages: { preferAlias: "Define alias for array type" },
  name: "prefer-alias-for-array-types"
});
