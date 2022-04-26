import * as utils from "./utils";
import { is } from "@skylib/functions";
import * as _ from "@skylib/lodash-commonjs-es";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";

export const noMultiTypeTuples = utils.createRule({
  create(context) {
    return {
      [AST_NODE_TYPES.TSTupleType](node): void {
        if (_.uniq(node.elementTypes.map(context.getText)).length > 1)
          context.report({ messageId: "multiTypeTuplesDisallowed", node });
      }
    };
  },
  isRuleOptions: is.object,
  messages: { multiTypeTuplesDisallowed: "Multi-type tuples are not allowed" },
  name: "no-multi-type-tuples"
});
