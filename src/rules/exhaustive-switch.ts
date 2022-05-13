import * as utils from "./utils";
import { is } from "@skylib/functions";
import * as _ from "@skylib/lodash-commonjs-es";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";

export const exhaustiveSwitch = utils.createRule({
  create: context => {
    return {
      [AST_NODE_TYPES.SwitchStatement]: (node): void => {
        const tests = node.cases.map(switchCase => switchCase.test);

        // eslint-disable-next-line unicorn/no-null
        if (tests.includes(null)) {
          // Has default
        } else {
          const got = _.flatten(
            tests
              .filter(is.not.empty)
              .map(expression => utils.getTypeParts(expression, context))
          );

          const expected = utils.getTypeParts.typeofFix(
            node.discriminant,
            context
          );

          if (_.difference(expected, got).length)
            context.report({ messageId: "inexhaustiveSwitch", node });
        }
      }
    };
  },
  isRuleOptions: is.object,
  messages: { inexhaustiveSwitch: "Inexhaustive switch" },
  name: "exhaustive-switch"
});
