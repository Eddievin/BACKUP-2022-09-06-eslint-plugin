import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

utils.testRule(
  "no-restricted-syntax",
  rules,
  [
    {
      code: `
        invalid();
      `,
      errors: [{ line: 1, messageId: "customMessage" }],
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        { rules: [{ selector: "Identifier", subOptionsId: "rule-id" }] }
      ]
    },
    {
      code: `
        invalid();
      `,
      errors: [{ line: 1, messageId: "customMessage" }],
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          rules: [
            {
              filesToLint: ["./fixtures/file.ts"],
              filesToSkip: ["./fixtures/**", "./other/**"],
              selector: "Identifier"
            }
          ]
        }
      ]
    }
  ],
  [
    {
      code: `
        invalid();
      `,
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        invalid();
      `,
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        { rules: [{ filesToSkip: ["./fixtures/**"], selector: "Identifier" }] }
      ]
    },
    {
      code: `
        invalid();
      `,
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        { rules: [{ filesToLint: ["./other/**"], selector: "Identifier" }] }
      ]
    },
    {
      code: `
        /* skylib/eslint-plugin disable no-restricted-syntax[rule-id] */

        invalid();
      `,
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        { rules: [{ selector: "Identifier", subOptionsId: "rule-id" }] }
      ]
    }
  ]
);
