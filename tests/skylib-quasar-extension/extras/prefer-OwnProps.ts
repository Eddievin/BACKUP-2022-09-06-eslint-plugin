/* eslint-disable @skylib/match-filename/project/testRule-name -- Ok */

import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["quasar-extension/extras/prefer-OwnProps"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-OwnProps", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "interface Props { x: string; }",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
