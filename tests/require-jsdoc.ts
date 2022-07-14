import {
  InterfaceOption,
  MessageId,
  PropertyOption,
  requireJsdoc
} from "@/rules/require-jsdoc";
import getCurrentLine from "get-current-line";
import { utils } from "@";

utils.testRule(
  "require-jsdoc",
  requireJsdoc,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        function f(): void {}

        /** Comment */
        function g(): void {}
      `,
      errors: [{ messageId: MessageId.undocumented }]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ interfaces: [InterfaceOption.interface] }],
      code: `
        /** Comment */
        interface I {}

        interface J extends I {}
      `,
      errors: [{ line: 4, messageId: MessageId.undocumented }]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ interfaces: [InterfaceOption.callSignatures] }],
      code: `
        interface I {
          /** Comment */
          (): void;
        }

        interface J extends I {
          (): void;
        }
      `,
      errors: [
        {
          line: 6,
          endLine: 8,
          messageId: MessageId.undocumentedCallSignature
        }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ interfaces: [InterfaceOption.constructSignatures] }],
      code: `
        interface I {
          /** Comment */
          new (): object;
        }

        interface J extends I {
          new (): object;
        }
      `,
      errors: [
        {
          line: 6,
          endLine: 8,
          messageId: MessageId.undocumentedConstructSignature
        }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
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
        { endLine: 11, messageId: MessageId.undocumented },
        { line: 2, messageId: MessageId.undocumentedConstructSignature },
        { line: 4, messageId: MessageId.undocumented },
        { line: 6, messageId: MessageId.undocumented },
        { line: 8, messageId: MessageId.undocumented },
        { line: 10, messageId: MessageId.undocumented }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ properties: [PropertyOption.function] }],
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
        { endLine: 10, messageId: MessageId.undocumented },
        { line: 2, messageId: MessageId.undocumented }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ properties: [PropertyOption.nonFunction] }],
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
        { endLine: 10, messageId: MessageId.undocumented },
        { line: 2, messageId: MessageId.undocumented }
      ]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ includeSelectors: ["Literal"], noDefaultSelectors: true }],
      code: "class C {}"
    }
  ]
);
