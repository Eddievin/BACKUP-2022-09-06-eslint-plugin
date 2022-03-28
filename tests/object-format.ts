import getCurrentLine from "get-current-line";

import objectFormat from "@/rules/object-format";
import * as utils from "@/rules/utils";

utils.testRule(
  "object-format",
  objectFormat,
  [
    {
      code: `
        const obj = {
        x: 1
        };
      `,
      errors: [{ line: 1, messageId: "expectingSingleLine" }],
      name: `Test at line ${getCurrentLine().line}`,
      output: `
        const obj = {x: 1};
      `
    },
    {
      code: `
        const obj = f({
        x: 1
        });
      `,
      errors: [{ line: 1, messageId: "expectingSingleLine" }],
      name: `Test at line ${getCurrentLine().line}`,
      output: `
        const obj = f({x: 1});
      `
    },
    {
      code: `
        const obj = {
        x: 1,
        y: 2
        };
      `,
      errors: [{ line: 1, messageId: "expectingSingleLine" }],
      name: `Test at line ${getCurrentLine().line}`,
      output: `
        const obj = {x: 1,y: 2};
      `
    },
    {
      code: `
        const obj = {x: 1,y: 2,y: 3};
      `,
      errors: [{ line: 1, messageId: "expectingMultiline" }],
      name: `Test at line ${getCurrentLine().line}`,
      output: `
        const obj = {
        x: 1,
        y: 2,
        y: 3
        };
      `
    }
  ],
  [
    {
      code: `
        const obj = {x: 1} as const;
      `,
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        const obj = {
        x: 1
        } as const;
      `,
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        const obj = {
        // Comment
        x: 1
        };
      `,
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        const obj = { // Comment
        x: 1
        };
      `,
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        const obj = {
        x: 1 // Comment
        };
      `,
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        const obj = {
        x: 1, // Comment
        x: 2
        };
      `,
      name: `Test at line ${getCurrentLine().line}`
    }
  ]
);
