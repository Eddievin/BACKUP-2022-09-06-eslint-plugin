/* eslint-disable @skylib/match-filename/testRule-name -- Postponed */

import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["quasar-extension/extras/prefer-Props-interface"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-Props-interface", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "type Props = { x: string }",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
