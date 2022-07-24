import * as utils from "./utils";
import type {
  RuleFix,
  RuleListener
} from "@typescript-eslint/utils/dist/ts-eslint";
import { a, evaluate, s } from "@skylib/functions";
import type { AST } from "vue-eslint-parser";

export enum MessageId {
  addSpaces = "addSpaces",
  removeSpaces = "removeSpaces"
}

export const vueElementContentsSpacing = utils.createRule({
  name: "vue-element-contents-spacing",
  fixable: utils.Fixable.code,
  vue: true,
  messages: {
    [MessageId.addSpaces]: "Add spaces around double curly",
    [MessageId.removeSpaces]: "Remove spaces around double curly"
  },
  create: (context): RuleListener => ({
    VElement: (node: AST.VElement) => {
      if (node.children.length) {
        const range = evaluate(() => {
          const { children } = node;

          const first = a.first(children);

          const last = a.last(children);

          return [first.range[0], last.range[1]] as const;
        });

        const got = context.code.slice(...range);

        const leadingSpaces = s.leadingSpaces(got);

        const trailingSpaces = s.trailingSpaces(got);

        if (s.multiline(got) && (!leadingSpaces || !trailingSpaces))
          context.report({
            fix: (): RuleFix => ({ range, text: ` ${got.trim()} ` }),
            loc: context.getLocFromRange(range),
            messageId: MessageId.addSpaces
          });

        if (s.singleLine(got) && (leadingSpaces || trailingSpaces))
          context.report({
            fix: (): RuleFix => ({ range, text: got.trim() }),
            loc: context.getLocFromRange(range),
            messageId: MessageId.removeSpaces
          });
      }
    }
  })
});
