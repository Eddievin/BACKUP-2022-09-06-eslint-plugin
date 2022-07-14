import { MessageId, onlyExportName } from "@/rules/only-export-name";
import getCurrentLine from "get-current-line";
import { utils } from "@";

utils.testRule(
  "only-export-name",
  onlyExportName,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "PascalCase.ts",
      code: "export class C {}",
      errors: [
        { messageId: MessageId.invalidName, data: { expected: "PascalCase" } }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "camelCase.ts",
      code: 'export { x } from "source";',
      errors: [
        { messageId: MessageId.invalidName, data: { expected: "camelCase" } }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "kebab-case.ts",
      code: "export function f() {}",
      errors: [
        { messageId: MessageId.invalidName, data: { expected: "kebabCase" } }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "PascalCase.PascalCase.ts",
      code: "export interface I {}",
      errors: [
        { messageId: MessageId.invalidName, data: { expected: "PascalCase" } }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "camelCase.camelCase.ts",
      code: "export namespace n {}",
      errors: [
        { messageId: MessageId.invalidName, data: { expected: "camelCase" } }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "kebab-case.kebab-case.ts",
      code: "export type T = string;",
      errors: [
        { messageId: MessageId.invalidName, data: { expected: "kebabCase" } }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: "export const x = 1;",
      errors: [{ messageId: MessageId.invalidName, data: { expected: "file" } }]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "PascalCase.ts",
      code: "export class PascalCase {}"
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "camelCase.ts",
      code: 'export { default } from "source";'
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "camelCase.ts",
      code: 'export { camelCase } from "source";'
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "kebab-case.ts",
      code: "export function kebabCase() {}"
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "PascalCase.PascalCase.ts",
      code: "export interface PascalCase {}"
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "camelCase.camelCase.ts",
      code: "export namespace camelCase {}"
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "kebab-case.kebab-case.ts",
      code: "export type kebabCase = string;"
    },
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
        export { y };
      `
    }
  ]
);
