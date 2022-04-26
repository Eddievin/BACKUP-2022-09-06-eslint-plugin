import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

utils.testRule(
  "prefer-readonly-props",
  rules,
  [
    {
      code: `
        class T1 { x: string; }
        interface T2 { x: string; }
        class WritableClass { x: string; }
        interface WritableInterface { x: string; }
        class T3 {
          writableIdentifier1: string;
          'writableIdentifier2': string;
          "writableIdentifier3": string;
        }
        interface T4 {
          writableIdentifier1: string;
          'writableIdentifier2': string;
          "writableIdentifier3": string;
        }
      `,
      errors: [
        { line: 1, messageId: "expectingReadonlyProperty" },
        { line: 2, messageId: "expectingReadonlyProperty" }
      ],
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          ignoreIdentifiers: [/^writableIdentifier/u.source],
          ignoreSelectedClasses: [/^WritableClass$/u.source],
          ignoreSelectedInterfaces: [/^WritableInterface$/u.source]
        }
      ]
    },
    {
      code: `
        class TestClass {
          private x: string;
          protected 'y': string;
          public "z": string;
        }
      `,
      errors: [
        { line: 2, messageId: "expectingReadonlyProperty" },
        { line: 3, messageId: "expectingReadonlyProperty" },
        { line: 4, messageId: "expectingReadonlyProperty" }
      ],
      name: `Test at line ${getCurrentLine().line}`
    }
  ],
  [
    {
      code: `
        class T1 { readonly x: string; }
        interface T2 { readonly x: string; }
      `,
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        class T1 { x: string; }
        interface T2 { x: string; }
      `,
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ ignoreClasses: true, ignoreInterfaces: true }]
    },
    {
      code: `
        class TestClass { private x: string; }
      `,
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ ignorePrivateProperties: true }]
    },
    {
      code: `
        class TestClass { protected x: string; }
      `,
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ ignoreProtectedProperties: true }]
    },
    {
      code: `
        class TestClass { public x: string; }
      `,
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ ignorePublicProperties: true }]
    }
  ]
);
