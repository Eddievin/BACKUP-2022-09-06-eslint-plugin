import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["restrict-syntax"];

const MessageId = utils.getMessageId(rule);

utils.testRule("restrict-syntax", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ selector: "VElement[name=p]" }],
    code: `
      <template>
        <p>Text</p>
      </template>
    `,
    errors: [
      {
        line: 2,
        messageId: MessageId.customMessage,
        data: {
          _id: "id",
          message: "This syntax is not allowed: VElement[name=p]"
        }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ selector: "Identifier" }],
    code: `
      <script lang="ts">
      const id1 = [];
      </script>
    `,
    errors: [
      {
        line: 2,
        messageId: MessageId.customMessage,
        data: { message: "This syntax is not allowed: Identifier" }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      { replacement: "id2", selector: ["Identifier", "Identifier[name=id1]"] }
    ],
    code: "const id1 = [];",
    output: "const id2 = [];",
    errors: [
      {
        line: 1,
        messageId: MessageId.customMessage,
        data: {
          _id: "id",
          message:
            "This syntax is not allowed: Identifier, Identifier[name=id1]"
        }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        replacement: "e",
        search: /d/u.source,
        selector: ["Identifier"]
      }
    ],
    code: "const id1 = [];",
    output: "const ie1 = [];",
    errors: [
      {
        line: 1,
        messageId: MessageId.customMessage,
        data: { message: "Custom message" }
      }
    ]
  }
]);
