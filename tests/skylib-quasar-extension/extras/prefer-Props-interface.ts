/* eslint-disable @skylib/match-filename/project/testRule-name -- Ok */

import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["quasar-extension/extras/prefer-Props-interface"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-Props-interface", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "type Props = { x: string }",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
