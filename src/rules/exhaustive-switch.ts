import * as _ from "@skylib/lodash-commonjs-es";
import * as utils from "./utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import { is } from "@skylib/functions";

export const exhaustiveSwitch = utils.createRule({
  name: "exhaustive-switch",
  isOptions: is.object,
  messages: { inexhaustiveSwitch: "Inexhaustive switch" },
  create: (context): RuleListener => ({
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
  })
});
