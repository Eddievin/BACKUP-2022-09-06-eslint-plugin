import * as is from "@skylib/functions/dist/guards";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import * as _ from "lodash";
import * as utils from "./utils";

const rule = utils.createRule({
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

export = rule;
