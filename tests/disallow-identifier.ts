import getCurrentLine from "get-current-line";

import disallowIdentifier from "@/rules/disallow-identifier";
import * as utils from "@/rules/utils";

utils.testRule("disallow-identifier", disallowIdentifier, [
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
