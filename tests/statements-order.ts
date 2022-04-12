import getCurrentLine from "get-current-line";

import statementsOrder from "@/rules/statements-order";
import * as utils from "@/rules/utils";

utils.testRule(
  "statements-order",
  statementsOrder,
  [
    {
      code: `
        import "I1";
        function PF2();
        function PF1() {}
        const PU3 = 1;
        class PU2 {}
        var PU1 = 1;
        type PT2 = 1;
        interface PT1 {}
        export function EF2();
        export function EF1() {}
        export const EU3 = 1;
        export class EU2 {}
        export var EU1 = 1;
        export type ET2 = 1;
        export interface ET1 {}
        export { PU1, PU2, PU3 };
        export default 1;
        import "I2";
        declare global {}
      `,
      errors: [{ line: 1, messageId: "incorrectStatementsOrder" }],
      name: `Test at line ${getCurrentLine().line}`,
      output: `
        import "I1";
        import "I2";
        declare global {}
        export default 1;
        export { PU1, PU2, PU3 };
        export const EU3 = 1;
        export class EU2 {}
        export var EU1 = 1;
        export interface ET1 {}
        export type ET2 = 1;
        export function EF1() {}
        export function EF2();
        const PU3 = 1;
        class PU2 {}
        var PU1 = 1;
        interface PT1 {}
        type PT2 = 1;
        function PF1() {}
        function PF2();
      `
    },
    {
      code: `
        import "I1";
        function PF2();
        function PF1() {}
        const PU3 = 1;
        class PU2 {}
        var PU1 = 1;
        type PT2 = 1;
        interface PT1 {}
        import "I2";
      `,
      errors: [{ line: 1, messageId: "incorrectStatementsOrder" }],
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          order: [
            "ImportDeclaration",
            "ModuleDeclaration",
            "ExportDefaultDeclaration",
            "ExportDeclaration",
            "ExportUnknown",
            "ExportTypeDeclaration",
            "ExportFunctionDeclaration",
            "FunctionDeclaration",
            "TypeDeclaration",
            "Unknown"
          ]
        }
      ],
      output: `
        import "I1";
        import "I2";
        function PF1() {}
        function PF2();
        interface PT1 {}
        type PT2 = 1;
        const PU3 = 1;
        class PU2 {}
        var PU1 = 1;
      `
    },
    {
      code: `
        import "I1";
        function PF2();
        function PF1() {}
        const PU3 = 1;
        class PU2 {}
        var PU1 = 1;
        type PT2 = 1;
        interface PT1 {}
        import "I2";
      `,
      errors: [{ line: 1, messageId: "incorrectStatementsOrder" }],
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          rootOrder: [
            "ImportDeclaration",
            "ModuleDeclaration",
            "ExportDefaultDeclaration",
            "ExportDeclaration",
            "ExportUnknown",
            "ExportTypeDeclaration",
            "ExportFunctionDeclaration",
            "FunctionDeclaration",
            "TypeDeclaration",
            "Unknown"
          ]
        }
      ],
      output: `
        import "I1";
        import "I2";
        function PF1() {}
        function PF2();
        interface PT1 {}
        type PT2 = 1;
        const PU3 = 1;
        class PU2 {}
        var PU1 = 1;
      `
    },
    {
      code: `
        function f() {
          function PF2();
          function PF1() {}
          const PU3 = 1;
          class PU2 {}
          var PU1 = 1;
          type PT2 = 1;
          interface PT1 {}
        }
      `,
      errors: [{ line: 1, messageId: "incorrectStatementsOrder" }],
      name: `Test at line ${getCurrentLine().line}`,
      output: `
        function f() {
          const PU3 = 1;
          class PU2 {}
          var PU1 = 1;
          interface PT1 {}
          type PT2 = 1;
          function PF1() {}
          function PF2();
        }
      `
    },
    {
      code: `
        function f() {
          function PF2();
          function PF1() {}
          const PU3 = 1;
          class PU2 {}
          var PU1 = 1;
          type PT2 = 1;
          interface PT1 {}
        }
      `,
      errors: [{ line: 1, messageId: "incorrectStatementsOrder" }],
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          blockOrder: [
            "ImportDeclaration",
            "ModuleDeclaration",
            "ExportDefaultDeclaration",
            "ExportDeclaration",
            "ExportUnknown",
            "ExportTypeDeclaration",
            "ExportFunctionDeclaration",
            "FunctionDeclaration",
            "TypeDeclaration",
            "Unknown"
          ]
        }
      ],
      output: `
        function f() {
          function PF1() {}
          function PF2();
          interface PT1 {}
          type PT2 = 1;
          const PU3 = 1;
          class PU2 {}
          var PU1 = 1;
        }
      `
    },
    {
      code: `
        namespace NS {
          function PF2();
          function PF1() {}
          const PU3 = 1;
          class PU2 {}
          var PU1 = 1;
          type PT2 = 1;
          interface PT1 {}
        }
      `,
      errors: [{ line: 1, messageId: "incorrectStatementsOrder" }],
      name: `Test at line ${getCurrentLine().line}`,
      output: `
        namespace NS {
          const PU3 = 1;
          class PU2 {}
          var PU1 = 1;
          interface PT1 {}
          type PT2 = 1;
          function PF1() {}
          function PF2();
        }
      `
    },
    {
      code: `
        namespace NS {
          function PF2();
          function PF1() {}
          const PU3 = 1;
          class PU2 {}
          var PU1 = 1;
          type PT2 = 1;
          interface PT1 {}
        }
      `,
      errors: [{ line: 1, messageId: "incorrectStatementsOrder" }],
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          moduleOrder: [
            "ImportDeclaration",
            "ModuleDeclaration",
            "ExportDefaultDeclaration",
            "ExportDeclaration",
            "ExportUnknown",
            "ExportTypeDeclaration",
            "ExportFunctionDeclaration",
            "FunctionDeclaration",
            "TypeDeclaration",
            "Unknown"
          ]
        }
      ],
      output: `
        namespace NS {
          function PF1() {}
          function PF2();
          interface PT1 {}
          type PT2 = 1;
          const PU3 = 1;
          class PU2 {}
          var PU1 = 1;
        }
      `
    },
    {
      code: `
        import "I1";
        test("test4", () => {});
        test.each([])("test3", () => {});
        test("test2", () => {});
        test.each([])("test1", () => {});
        console.log(1);
        import "I2";
      `,
      errors: [{ line: 1, messageId: "incorrectStatementsOrder" }],
      name: `Test at line ${getCurrentLine().line}`,
      output: `
        import "I1";
        import "I2";
        console.log(1);
        test.each([])("test1", () => {});
        test("test2", () => {});
        test.each([])("test3", () => {});
        test("test4", () => {});
      `
    }
  ],
  [
    {
      code: `
        const x = 1;
        export = x;
      `,
      name: `Test at line ${getCurrentLine().line}`
    }
  ]
);
