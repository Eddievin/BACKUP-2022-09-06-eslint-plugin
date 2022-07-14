import { MessageId, primaryExportOnly } from "@/rules/primary-export-only";
import getCurrentLine from "get-current-line";
import { utils } from "@";

utils.testRule(
  "primary-export-only",
  primaryExportOnly,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export const file = 1;
        export * from "source";
      `,
      errors: [{ line: 1, messageId: MessageId.invalidExport }]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export const file = 1;
        export * as y from "source";
      `,
      errors: [{ line: 1, messageId: MessageId.invalidExport }]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export const file = 1;
        export default 1;
      `,
      errors: [{ line: 1, messageId: MessageId.invalidExport }]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export const file = 1;
        export const y = 1;
      `,
      errors: [{ line: 1, messageId: MessageId.invalidExport }]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: "export const file = 1;"
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export const x = 1;
        export * from "source";
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export const x = 1;
        export * as y from "source";
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export const x = 1;
        export default 1;
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export const x = 1;
        export const y = 1;
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export class file {}
        export namespace file {}
      `
    }
  ]
);
