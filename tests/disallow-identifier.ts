import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

utils.testRule("disallow-identifier", rules, [
  {
    code: `
      const invalid1 = [];

      invalid2();
    `,
    errors: [
      { line: 1, messageId: "disallowedIdentifier" },
      { line: 3, messageId: "disallowedIdentifier" }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        rules: [
          { ids: ["invalid1"], replacement: "valid1" },
          { ids: ["invalid2"] }
        ]
      }
    ],
    output: `
      const valid1 = [];

      invalid2();
    `
  }
]);
