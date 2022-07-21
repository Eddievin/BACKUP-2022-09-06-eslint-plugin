import { MessageId, NodeType, statementsOrder } from "@/rules/statements-order";
import getCurrentLine from "get-current-line";
import { utils } from "@";

utils.testRule(
  "statements-order",
  statementsOrder,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
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
      `,
      errors: [
        { line: 1, endLine: 27, messageId: MessageId.incorrectStatementsOrder }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          order: [
            NodeType.ImportDeclaration,
            NodeType.ModuleDeclaration,
            NodeType.ExportDefaultDeclaration,
            NodeType.ExportDeclaration,
            NodeType.ExportUnknown,
            NodeType.ExportTypeDeclaration,
            NodeType.ExportFunctionDeclaration,
            NodeType.FunctionDeclaration,
            NodeType.TypeDeclaration,
            NodeType.Unknown
          ]
        }
      ],
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
      `,
      errors: [
        { line: 1, endLine: 9, messageId: MessageId.incorrectStatementsOrder }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          rootOrder: [
            NodeType.ImportDeclaration,
            NodeType.ModuleDeclaration,
            NodeType.ExportDefaultDeclaration,
            NodeType.ExportDeclaration,
            NodeType.ExportUnknown,
            NodeType.ExportTypeDeclaration,
            NodeType.ExportFunctionDeclaration,
            NodeType.FunctionDeclaration,
            NodeType.TypeDeclaration,
            NodeType.Unknown
          ]
        }
      ],
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
      `,
      errors: [
        { line: 1, endLine: 9, messageId: MessageId.incorrectStatementsOrder }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
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
      `,
      errors: [
        { line: 1, endLine: 9, messageId: MessageId.incorrectStatementsOrder }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          blockOrder: [
            NodeType.ImportDeclaration,
            NodeType.ModuleDeclaration,
            NodeType.ExportDefaultDeclaration,
            NodeType.ExportDeclaration,
            NodeType.ExportUnknown,
            NodeType.ExportTypeDeclaration,
            NodeType.ExportFunctionDeclaration,
            NodeType.FunctionDeclaration,
            NodeType.TypeDeclaration,
            NodeType.Unknown
          ]
        }
      ],
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
      `,
      errors: [
        { line: 1, endLine: 9, messageId: MessageId.incorrectStatementsOrder }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
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
      `,
      errors: [
        { line: 1, endLine: 9, messageId: MessageId.incorrectStatementsOrder }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          moduleOrder: [
            NodeType.ImportDeclaration,
            NodeType.ModuleDeclaration,
            NodeType.ExportDefaultDeclaration,
            NodeType.ExportDeclaration,
            NodeType.ExportUnknown,
            NodeType.ExportTypeDeclaration,
            NodeType.ExportFunctionDeclaration,
            NodeType.FunctionDeclaration,
            NodeType.TypeDeclaration,
            NodeType.Unknown
          ]
        }
      ],
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
      `,
      errors: [
        { line: 1, endLine: 9, messageId: MessageId.incorrectStatementsOrder }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        import "I1";
        test.only.each([])("testA", () => {});
        test.only("test9", () => {});
        test.each([])("test8", () => {});
        test("test7", () => {});
        test.skip.each([])("test6", () => {});
        test.skip("test5", () => {});
        test.only.each([])("test4", () => {});
        test.only("test3", () => {});
        test.each([])("test2", () => {});
        test("test1", () => {});
        console.log(1);
        import "I2";
      `,
      output: `
        import "I1";
        import "I2";
        console.log(1);
        test("test1", () => {});
        test.each([])("test2", () => {});
        test.only("test3", () => {});
        test.only.each([])("test4", () => {});
        test.skip("test5", () => {});
        test.skip.each([])("test6", () => {});
        test("test7", () => {});
        test.each([])("test8", () => {});
        test.only("test9", () => {});
        test.only.each([])("testA", () => {});
      `,
      errors: [
        { line: 1, endLine: 13, messageId: MessageId.incorrectStatementsOrder }
      ]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        const x = 1;
        export = x;
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        const x = 1;
        test("sample", () => {});
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          rootOrder: [
            NodeType.ImportDeclaration,
            NodeType.GlobalModuleDeclaration,
            NodeType.ExportAllDeclaration,
            NodeType.ExportDeclaration,
            NodeType.ExportDefaultDeclaration,
            NodeType.ExportUnknown,
            NodeType.ExportTypeDeclaration,
            NodeType.ExportFunctionDeclaration,
            NodeType.ExportModuleDeclaration,
            NodeType.Unknown,
            NodeType.TypeDeclaration,
            NodeType.FunctionDeclaration,
            NodeType.ModuleDeclaration,
            NodeType.JestTest
          ]
        }
      ],
      code: `
        const x = 1;
        test("sample", () => {});
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        test.each([])("prop: selected", async () => {});
        test.each([])("prop: selected (multi-select)", async () => {});
      `
    }
  ]
);
