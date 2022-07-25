import * as _ from "@skylib/lodash-commonjs-es";
import * as utils from "../../utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import { is } from "@skylib/functions";

export enum MessageId {
  inexhaustiveSwitch = "inexhaustiveSwitch"
}

export const exhaustiveSwitch = utils.createRule({
  name: "exhaustive-switch",
  messages: { [MessageId.inexhaustiveSwitch]: "Inexhaustive switch" },
  create: (context, typeCheck): RuleListener => ({
    SwitchStatement: node => {
      if (node.cases.some(switchCase => is.null(switchCase.test))) {
        // Has default
      } else {
        const got = node.cases
          .map(switchCase => switchCase.test)
          .filter(is.not.empty)
          .flatMap(expression => typeCheck.unionTypeParts(expression));

        const expected = typeCheck.unionTypeParts(node.discriminant);

        if (_.difference(expected, got).length)
          context.report({
            messageId: MessageId.inexhaustiveSwitch,
            node: node.discriminant
          });
      }
    }
  })
});
