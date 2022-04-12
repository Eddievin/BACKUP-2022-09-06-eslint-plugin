import * as ts from "typescript";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import * as is from "@skylib/functions/dist/guards";

import * as utils from "./utils";

const rule = utils.createRule({
  create(context) {
    return {
      [AST_NODE_TYPES.AssignmentExpression](node): void {
        if (node.left.type === AST_NODE_TYPES.MemberExpression) {
          const tsObject = context.toTsNode(node.left.object);

          const type = context.checker.getTypeAtLocation(tsObject);

          const signatures = context.checker.getSignaturesOfType(
            type,
            ts.SignatureKind.Call
          );

          if (signatures.length)
            context.report({ messageId: "noDistributedDefinition", node });
        }
      }
    };
  },
  isRuleOptions: is.object,
  messages: {
    noDistributedDefinition:
      "Use Object.assign to define function in one statement"
  },
  name: "function-properties-style"
});

export = rule;
