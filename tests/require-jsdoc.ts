import getCurrentLine from "get-current-line";

import requireJsdoc from "@/rules/require-jsdoc";
import * as utils from "@/rules/utils";

utils.testRule("require-jsdoc", requireJsdoc, [
  {
    code: `
      function f(): void {}

      /** Comment */
      function g(): void {}
    `,
    errors: [{ line: 1, messageId: "undocumented" }],
    name: `Test at line ${getCurrentLine().line}`
  },
  {
    code: `
      /** Comment */
      interface I {}

      interface J extends I {}
    `,
    errors: [{ line: 4, messageId: "undocumented" }],
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ interfaceOptions: ["interface"] }]
  },
  {
    code: `
      interface I {
        /** Comment */
        (): void;
      }

      interface J extends I {
        (): void;
      }
    `,
    errors: [{ line: 6, messageId: "undocumentedCallSignature" }],
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ interfaceOptions: ["callSignatures"] }]
  },
  {
    code: `
      interface I {
        /** Comment */
        new (): object;
      }

      interface J extends I {
        new (): object;
      }
    `,
    errors: [{ line: 6, messageId: "undocumentedConstructSignature" }],
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ interfaceOptions: ["constructSignatures"] }]
  },
  {
    code: `
      class C {
        public constructor()  {}

        public get x(): boolean { return true; }

        public set x(value: boolean) {}

        public f() {}

        public static g() {}
      }

      /** Comment */
      class D {
        /** Comment */
        public constructor()  {}

        /** Comment */
        public get x(): boolean { return true; }

        /** Comment */
        public set x(value: boolean) {}

        /** Comment */
        public f() {}

        /** Comment */
        public static g() {}
      }
    `,
    errors: [
      { line: 1, messageId: "undocumented" },
      { line: 2, messageId: "undocumentedConstructSignature" },
      { line: 4, messageId: "undocumented" },
      { line: 6, messageId: "undocumented" },
      { line: 8, messageId: "undocumented" },
      { line: 10, messageId: "undocumented" }
    ],
    name: `Test at line ${getCurrentLine().line}`
  },
  {
    code: `
      class C {
        f1: () => void;

        /** Comment */
        f2: () => void;

        f3;

        f4: string;
      }
    `,
    errors: [
      { line: 1, messageId: "undocumented" },
      { line: 2, messageId: "undocumented" }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ propertyOptions: ["function"] }]
  },
  {
    code: `
      class C {
        x1: string;

        /** Comment */
        x2: string;

        x3;

        x4: () => void;
      }
    `,
    errors: [
      { line: 1, messageId: "undocumented" },
      { line: 2, messageId: "undocumented" }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ propertyOptions: ["nonFunction"] }]
  }
]);
