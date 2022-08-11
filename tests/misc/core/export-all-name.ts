import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["export-all-name"];

const MessageId = utils.getMessageId(rule);

utils.testRule(
  "export-all-name",
  rule,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export * as a from "b";
      `,
      errors: [{ line: 1, messageId: MessageId.invalidName }]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export * as AaaBbbCcc1 from "AaaBbbCcc1";
        export * as AaaBbbCcc2 from "AaaBbbCcc2.ts";
        export * as AaaBbbCcc3 from "index.AaaBbbCcc3";
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export * as aaaBbbCcc1 from "aaaBbbCcc1";
        export * as aaaBbbCcc2 from "aaaBbbCcc2.ts";
        export * as aaaBbbCcc3 from "index.aaaBbbCcc3";
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export * as aaaBbbCcc1 from "aaa-bbb-ccc1";
        export * as aaaBbbCcc2 from "aaa-bbb-ccc2.ts";
        export * as aaaBbbCcc3 from "index.aaa-bbb-ccc3";
      `
    }
  ]
);
