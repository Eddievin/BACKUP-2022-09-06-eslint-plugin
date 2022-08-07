import * as utils from "../../utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import { is } from "@skylib/functions";

export enum MessageId {
  inconsistentMember = "inconsistentMember"
}

export const consistentEnumMembers = utils.createRule({
  name: "consistent-enum-members",
  vue: true,
  defaultOptions: { selector: [] },
  messages: { [MessageId.inconsistentMember]: "Inconsistent enum member" },
  create: (context): RuleListener => ({
    TSEnumMember: node => {
      if (
        node.id.type === AST_NODE_TYPES.Identifier &&
        node.initializer &&
        node.initializer.type === AST_NODE_TYPES.Literal &&
        is.string(node.initializer.value) &&
        node.id.name !== node.initializer.value
      )
        context.report({ messageId: MessageId.inconsistentMember, node });
    }
  })
});
