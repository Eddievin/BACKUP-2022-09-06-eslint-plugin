import { MessageId, objectFormat } from "@/rules/object-format";
import getCurrentLine from "get-current-line";
import { utils } from "@";

utils.testRule(
  "object-format",
  objectFormat,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        <template>
        <p :value="{
        x: 1
        }"></p>
        </template>
      `,
      output: `
        <template>
        <p :value="{x: 1}"></p>
        </template>
      `,
      errors: [
        {
          line: 2,
          endLine: 4,
          messageId: MessageId.expectingSingleLine
        }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        const obj = {
        x: 1
        };
      `,
      output: "const obj = {x: 1};",
      errors: [{ endLine: 3, messageId: MessageId.expectingSingleLine }]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        const obj = f({
        x: 1
        });
      `,
      output: "const obj = f({x: 1});",
      errors: [{ endLine: 3, messageId: MessageId.expectingSingleLine }]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        const obj = {
        x: 1,
        y: 2
        };
      `,
      output: "const obj = {x: 1,y: 2};",
      errors: [{ endLine: 4, messageId: MessageId.expectingSingleLine }]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: "const obj = {x: 1,y: 2,y: 3};",
      output: `
        const obj = {
        x: 1,
        y: 2,
        y: 3
        };
      `,
      errors: [{ messageId: MessageId.expectingMultiline }]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        const obj = {x: 1} as const;
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        const obj = {
        x: 1
        } as const;
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        const obj = {
        // Comment
        x: 1
        };
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        const obj = { // Comment
        x: 1
        };
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        const obj = {
        x: 1 // Comment
        };
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        const obj = {
        x: 1, // Comment
        x: 2
        };
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        const obj = {
        // Comment
        };
      `
    }
  ]
);
