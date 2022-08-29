import * as utils from "../../utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";

export enum MessageId {
  inconsistentMember = "inconsistentMember"
}

export const consistentEnumMembers = utils.createRule({
  name: "consistent-enum-members",
  vue: true,
  messages: { [MessageId.inconsistentMember]: "Inconsistent enum member" },
  docs: {
    description: "Requires value to coincide with key inside enum.",
    failExamples: `
      enum Enum {
        a = "b"
      }
    `,
    passExamples: `
      enum Enum {
        a = "a"
      }
    `
  },
  create: (context): RuleListener => ({
    TSEnumMember: node => {
      if (
        node.id.type === AST_NODE_TYPES.Identifier &&
        node.initializer &&
        node.initializer.type === AST_NODE_TYPES.Literal &&
        node.id.name !== node.initializer.value
      )
        context.report({ messageId: MessageId.inconsistentMember, node });
    }
  })
});
