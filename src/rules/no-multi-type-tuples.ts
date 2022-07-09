import * as _ from "@skylib/lodash-commonjs-es";
import * as utils from "./utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import { is } from "@skylib/functions";

export const noMultiTypeTuples = utils.createRule({
  name: "no-multi-type-tuples",
  isOptions: is.object,
  messages: { multiTypeTuplesDisallowed: "Multi-type tuples are not allowed" },
  create: (context): RuleListener => ({
    [AST_NODE_TYPES.TSTupleType]: (node): void => {
      if (_.uniq(node.elementTypes.map(context.getText)).length > 1)
        context.report({ messageId: "multiTypeTuplesDisallowed", node });
    }
  })
});
