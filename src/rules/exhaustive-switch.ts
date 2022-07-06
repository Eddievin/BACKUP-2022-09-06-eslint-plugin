import * as utils from "./utils";
import { is } from "@skylib/functions";
import * as _ from "@skylib/lodash-commonjs-es";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";

export const exhaustiveSwitch = utils.createRule({
  create: (context): RuleListener => {
    return {
      [AST_NODE_TYPES.SwitchStatement]: (node): void => {
        const tests = node.cases.map(switchCase => switchCase.test);

        // eslint-disable-next-line unicorn/no-null
        if (tests.includes(null)) {
          // Has default
        } else {
          const got = tests
            .filter(is.not.empty)
            .flatMap(expression => utils.getTypeParts(expression, context));

          const expected = utils.getTypeParts.typeofFix(
            node.discriminant,
            context
          );

          if (_.difference(expected, got).length > 0)
            context.report({ messageId: "inexhaustiveSwitch", node });
        }
      }
    };
  },
  isRuleOptions: is.object,
  messages: { inexhaustiveSwitch: "Inexhaustive switch" },
  name: "exhaustive-switch"
});
