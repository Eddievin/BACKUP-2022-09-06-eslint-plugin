import getCurrentLine from "get-current-line";
import { rules, utils } from "@";

utils.testRule(
  "class-only-export",
  rules,
  [
    {
      code: `
        export class C {}
        export default 1;
      `,
      errors: [{ line: 2, messageId: "exportNotAllowed" }],
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        export class C {}
        export const x = 1;
      `,
      errors: [{ line: 2, messageId: "exportNotAllowed" }],
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        export default class C {}
        const x = 1;
        export { x };
      `,
      errors: [{ line: 3, messageId: "exportNotAllowed" }],
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        export class C {}
        export * from "lodash";
      `,
      errors: [{ line: 2, messageId: "exportNotAllowed" }],
      name: `Test at line ${getCurrentLine().line}`
    }
  ],
  [
    {
      code: `
        export class C {}
      `,
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        export class C {}

        namespace Ns {
          export const x = 1;
        }
      `,
      name: `Test at line ${getCurrentLine().line}`
    }
  ]
);
