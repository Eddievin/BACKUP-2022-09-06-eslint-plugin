/* eslint-disable @skylib/match-filename/testRule-name -- Postponed */

import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["quasar-extension/extras/prefer-OwnProps"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-OwnProps", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "interface Props { x: string; }",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
