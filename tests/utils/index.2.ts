import getCurrentLine from "get-current-line";
import { rules, utils } from "@";

utils.testRule(
  "disallow-identifier",
  rules,
  [
    {
      code: `
        invalid();
      `,
      errors: [{ line: 1, messageId: "disallowedIdentifier" }],
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ rules: [{ ids: ["invalid"], subOptionsId: "rule-id" }] }]
    },
    {
      code: `
        invalid();
      `,
      errors: [{ line: 1, messageId: "disallowedIdentifier" }],
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          rules: [
            {
              filesToLint: ["./fixtures/file.ts"],
              filesToSkip: ["./fixtures/**", "./other/**"],
              ids: ["invalid"]
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
        { rules: [{ filesToSkip: ["./fixtures/**"], ids: ["invalid"] }] }
      ]
    },
    {
      code: `
        invalid();
      `,
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ rules: [{ filesToLint: ["./other/**"], ids: ["invalid"] }] }]
    },
    {
      code: `
        /* skylib/eslint-plugin disable disallow-identifier[rule-id] */

        invalid();
      `,
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ rules: [{ ids: ["invalid"], subOptionsId: "rule-id" }] }]
    }
  ]
);
