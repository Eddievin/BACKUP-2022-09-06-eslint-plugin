import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/types/no-ts-toolbelt"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-ts-toolbelt", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: 'import { FilterKeys } from "ts-toolbelt/out/Object/FilterKeys";',
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
