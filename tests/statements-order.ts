import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

utils.testRule(
  "statements-order",
  rules,
  [
    {
      code: `
        import "I1";
        namespace PN1 {}
        function PF2();
        function PF1() {}
        const PU3 = 1;
        class PU2 {}
        var PU1 = 1;
        type PT2 = 1;
        interface PT1 {}
        export namespace EN1 {}
        export function EF2();
        export function EF1() {}
        export const EU3 = 1;
        export class EU2 {}
        export var EU1 = 1;
        export type ET2 = 1;
        export interface ET1 {}
        export { PU1, PU2, PU3 };
        export { d } from "d";
        export type { D } from "d";
        export { a } from "a";
        export type { A } from "a";
        export * as c from "c";
        export * from "b";
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
        export * from "b";
        export * as c from "c";
        export type { A } from "a";
        export { a } from "a";
        export type { D } from "d";
        export { d } from "d";
        export { PU1, PU2, PU3 };
        export default 1;
        export const EU3 = 1;
        export class EU2 {}
        export var EU1 = 1;
        export interface ET1 {}
        export type ET2 = 1;
        export function EF1() {}
        export function EF2();
        export namespace EN1 {}
        const PU3 = 1;
        class PU2 {}
        var PU1 = 1;
        interface PT1 {}
        type PT2 = 1;
        function PF1() {}
        function PF2();
        namespace PN1 {}
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
        test.only.each([])("test8", () => {});
        test.only("test7", () => {});
        test.each([])("test6", () => {});
        test("test5", () => {});
        test.only.each([])("test4", () => {});
        test.only("test3", () => {});
        test.each([])("test2", () => {});
        test("test1", () => {});
        console.log(1);
        import "I2";
      `,
      errors: [{ line: 1, messageId: "incorrectStatementsOrder" }],
      name: `Test at line ${getCurrentLine().line}`,
      output: `
        import "I1";
        import "I2";
        console.log(1);
        test("test1", () => {});
        test.each([])("test2", () => {});
        test.only("test3", () => {});
        test.only.each([])("test4", () => {});
        test("test5", () => {});
        test.each([])("test6", () => {});
        test.only("test7", () => {});
        test.only.each([])("test8", () => {});
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
    },
    {
      code: `
        const x = 1;
        test("sample", () => {});
      `,
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        const x = 1;
        test("sample", () => {});
      `,
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          rootOrder: [
            "ImportDeclaration",
            "GlobalModuleDeclaration",
            "ExportAllDeclaration",
            "ExportDeclaration",
            "ExportDefaultDeclaration",
            "ExportUnknown",
            "ExportTypeDeclaration",
            "ExportFunctionDeclaration",
            "ExportModuleDeclaration",
            "Unknown",
            "TypeDeclaration",
            "FunctionDeclaration",
            "ModuleDeclaration",
            "JestTest"
          ]
        }
      ]
    }
  ]
);
