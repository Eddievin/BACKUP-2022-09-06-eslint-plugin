import * as ts from "typescript";
import * as utils from "./utils";
import { as, is } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";

export const preferAliasForArrayTypes = utils.createRule({
  create: (context): RuleListener => ({
    [AST_NODE_TYPES.TSTypeAnnotation]: (node): void => {
      if (node.typeAnnotation.type === AST_NODE_TYPES.TSTypeReference) {
        // Valid
      } else {
        const tsNode = context.toTsNode(node.typeAnnotation);

        const type = context.checker.getTypeAtLocation(tsNode);

        if (context.checker.isArrayType(type)) {
          const args = as.not.empty(type.typeArguments);

          if (
            args.every(subtype => subtype.isTypeParameter()) ||
            args.every(subtype => subtype.flags === ts.TypeFlags.Any)
          ) {
            // Valid
          } else context.report({ messageId: "preferAlias", node });
        }
      }
    }
  }),
  isRuleOptions: is.object,
  messages: { preferAlias: "Define alias for array type" },
  name: "prefer-alias-for-array-types"
});
