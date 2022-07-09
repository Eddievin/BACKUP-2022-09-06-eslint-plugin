import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

utils.testRule(
  "class-only-export",
  rules,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export class C extends D {}
        export default 1;
      `,
      errors: [{ line: 2, messageId: "exportNotAllowed" }]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export class C {}
        export const x = 1;
        export function f() {}
        export interface I {}
        export type T = string;
        export namespace N {}
      `,
      errors: [
        { line: 2, messageId: "exportNotAllowed" },
        { line: 3, messageId: "exportNotAllowed" },
        { line: 4, messageId: "exportNotAllowed" },
        { line: 5, messageId: "exportNotAllowed" },
        { line: 6, messageId: "exportNotAllowed" }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export default class C {}
        const x = 1;
        export { x };
      `,
      errors: [{ line: 3, messageId: "exportNotAllowed" }]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export class C {}
        export * from "lodash";
      `,
      errors: [{ line: 2, messageId: "exportNotAllowed" }]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export class C {}
        export * as _ from "lodash";
      `,
      errors: [{ line: 2, messageId: "exportNotAllowed" }]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export class C {}
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export class C {}
        namespace Ns { export const x = 1; }
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export class C {}
        export namespace C {}
      `
    }
  ]
);
