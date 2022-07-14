import {
  MessageId,
  arrayCallbackReturnType
} from "@/rules/array-callback-return-type";
import getCurrentLine from "get-current-line";
import { utils } from "@";

utils.testRule(
  "array-callback-return-type",
  arrayCallbackReturnType,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: "[1, true].every(x => x);",
      errors: [{ messageId: MessageId.invalidType }]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          filesToLint: ["./fixtures/file.ts"],
          filesToSkip: ["./fixtures/**", "./other/**"]
        }
      ],
      code: "[1, true].every(x => x);",
      errors: [{ messageId: MessageId.invalidType }]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ filesToSkip: ["./fixtures/**"] }],
      code: "[1, true].every(x => x);"
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ filesToLint: ["./other/**"] }],
      code: "[1, true].every(x => x);"
    }
  ]
);
