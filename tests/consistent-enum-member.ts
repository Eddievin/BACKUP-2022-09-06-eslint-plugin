import {
  MessageId,
  consistentEnumMember
} from "@/rules/consistent-enum-member";
import getCurrentLine from "get-current-line";
import { utils } from "@";

utils.testRule("consistent-enum-member", consistentEnumMember, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      enum E {
        a = "x",
        b = "b"
      }
    `,
    errors: [{ line: 2, messageId: MessageId.inconsistentMember }]
  }
]);
