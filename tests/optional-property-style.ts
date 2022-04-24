import getCurrentLine from "get-current-line";
import { rules, utils } from "@";

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

        interface I {
          x?: string | undefined;
          y?: string;
          z: string | undefined;
        }
      `,
      errors: [
        { line: 3, messageId: "expectingCombinedStyle" },
        { line: 4, messageId: "expectingCombinedStyle" },
        { line: 9, messageId: "expectingCombinedStyle" },
        { line: 10, messageId: "expectingCombinedStyle" }
      ],
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        class C {
          x?: string | undefined;
          y?: string;
          z: string | undefined;
        }

        interface I {
          x?: string | undefined;
          y?: string;
          z: string | undefined;
        }
      `,
      errors: [
        { line: 2, messageId: "expectingOptionalStyle" },
        { line: 4, messageId: "expectingOptionalStyle" },
        { line: 8, messageId: "expectingOptionalStyle" },
        { line: 10, messageId: "expectingOptionalStyle" }
      ],
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ style: "optional" }]
    },
    {
      code: `
        class C {
          x?: string | undefined;
          y?: string;
          z: string | undefined;
        }

        interface I {
          x?: string | undefined;
          y?: string;
          z: string | undefined;
        }
      `,
      errors: [
        { line: 2, messageId: "expectingUndefinedStyle" },
        { line: 3, messageId: "expectingUndefinedStyle" },
        { line: 8, messageId: "expectingUndefinedStyle" },
        { line: 9, messageId: "expectingUndefinedStyle" }
      ],
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ style: "undefined" }]
    }
  ],
  []
);
