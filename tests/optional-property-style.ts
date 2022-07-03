import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

utils.testRule(
  "optional-property-style",
  rules,
  [
    {
      code: `
        class C {
          x?: string | undefined;
          y?: string;
          z: string | undefined;
        }
        class D {
          x?: any;
          y?: unknown;
        }
      `,
      errors: [
        { line: 3, messageId: "expectingCombinedStyle" },
        { line: 4, messageId: "expectingCombinedStyle" }
      ],
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        export default class {
          x?: string | undefined;
          y?: string;
          z: string | undefined;
        }
        class D {
          x?: any;
          y?: unknown;
        }
      `,
      errors: [
        { line: 2, messageId: "expectingOptionalStyle" },
        { line: 4, messageId: "expectingOptionalStyle" }
      ],
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ classes: "optional" }]
    },
    {
      code: `
        const C = class {
          x?: string | undefined;
          y?: string;
          z: string | undefined;
        };
        class D {
          x?: any;
          y?: unknown;
        }
      `,
      errors: [
        { line: 2, messageId: "expectingUndefinedStyle" },
        { line: 3, messageId: "expectingUndefinedStyle" },
        { line: 7, messageId: "expectingUndefinedStyle" },
        { line: 8, messageId: "expectingUndefinedStyle" }
      ],
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ classes: "undefined" }]
    },
    {
      code: `
        class C {
          x?: string | undefined;
          y?: string | undefined;
        }
        class D {
          x?: string | undefined;
          y?: string | undefined;
        }
      `,
      errors: [
        { line: 2, messageId: "expectingUndefinedStyle" },
        { line: 3, messageId: "expectingUndefinedStyle" },
        { line: 6, messageId: "expectingUndefinedStyle" }
      ],
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          overrides: [
            {
              _id: "id1",
              patterns: ["^C$"],
              style: "undefined",
              target: "classes"
            },
            {
              _id: "id2",
              propertyPatterns: ["^x$"],
              style: "undefined",
              target: "classes"
            }
          ]
        }
      ]
    },
    {
      code: `
        interface I {
          x?: string | undefined;
          y?: string;
          z: string | undefined;
        }
        interface I {
          x?: any;
          y?: unknown;
        }
      `,
      errors: [
        { line: 3, messageId: "expectingCombinedStyle" },
        { line: 4, messageId: "expectingCombinedStyle" }
      ],
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        interface I {
          x?: string | undefined;
          y?: string;
          z: string | undefined;
        }
        interface I {
          x?: any;
          y?: unknown;
        }
      `,
      errors: [
        { line: 2, messageId: "expectingOptionalStyle" },
        { line: 4, messageId: "expectingOptionalStyle" }
      ],
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ interfaces: "optional" }]
    },
    {
      code: `
        interface I {
          x?: string | undefined;
          y?: string;
          z: string | undefined;
        }
        interface I {
          x?: any;
          y?: unknown;
        }
      `,
      errors: [
        { line: 2, messageId: "expectingUndefinedStyle" },
        { line: 3, messageId: "expectingUndefinedStyle" },
        { line: 7, messageId: "expectingUndefinedStyle" },
        { line: 8, messageId: "expectingUndefinedStyle" }
      ],
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ interfaces: "undefined" }]
    },
    {
      code: `
        interface I {
          x?: string | undefined;
          y?: string | undefined;
        }
        interface J {
          x?: string | undefined;
          y?: string | undefined;
        }
      `,
      errors: [
        { line: 2, messageId: "expectingUndefinedStyle" },
        { line: 3, messageId: "expectingUndefinedStyle" },
        { line: 6, messageId: "expectingUndefinedStyle" }
      ],
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          overrides: [
            {
              _id: "id1",
              patterns: ["^I$"],
              style: "undefined",
              target: "interfaces"
            },
            {
              _id: "id2",
              propertyPatterns: ["^x$"],
              style: "undefined",
              target: "interfaces"
            }
          ]
        }
      ]
    }
  ],
  [
    {
      code: `
        class C {
          x: string;
          f() {}
        }
        interface I {
          x: string;
          f();
        }
      `,
      name: `Test at line ${getCurrentLine().line}`
    }
  ]
);
