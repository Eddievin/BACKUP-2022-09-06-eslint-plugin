import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

utils.testRule(
  "empty-lines-around-comment",
  rules,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        /** Comment */

        function f(): void {}

        /*
        Comment
        */
        function g(): void {}

        // Comment

        function h(): void {}

        /*
        Comment
        */
      `,
      output: `
        /** Comment */
        function f(): void {}

        /*
        Comment
        */

        function g(): void {}

        // Comment
        function h(): void {}

        /*
        Comment
        */
      `,
      errors: [
        { line: 1, messageId: "unexpectedEmptyLineAfter" },
        { line: 5, messageId: "missingEmptyLineAfter" },
        { line: 10, messageId: "unexpectedEmptyLineAfter" }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        function f(): void {} // Comment

        async function g(): Promise<void> {
          await import(
            /* webpackChunkName: "chunk-name" */

            "source"
          );
        }

        class C {
          /*
          Comment
          */
          protected x;
        }

        {
          /*
          Comment
          */

        }
      `,
      output: `
        function f(): void {} // Comment

        async function g(): Promise<void> {
          await import(
            /* webpackChunkName: "chunk-name" */
            "source"
          );
        }

        class C {
          /*
          Comment
          */

          protected x;
        }

        {
          /*
          Comment
          */
        }
      `,
      errors: [
        { line: 5, messageId: "unexpectedEmptyLineAfter" },
        { line: 12, messageId: "missingEmptyLineAfter" },
        { line: 19, messageId: "unexpectedEmptyLineAfter" }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        /* eslint-disable: rule1 */
        /* eslint-disable: rule2 */
        /* eslint-disable: rule3 */
        function f(): void {}
      `,
      output: `
        /* eslint-disable: rule1 */

        /* eslint-disable: rule2 */

        /* eslint-disable: rule3 */

        function f(): void {}
      `,
      errors: [
        { line: 2, messageId: "missingEmptyLineBefore" },
        { line: 3, messageId: "missingEmptyLineBefore" },
        { line: 3, messageId: "missingEmptyLineAfter" }
      ]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        /* eslint-disable: rule1 */

        /* eslint-disable: rule2 */

        /* eslint-disable: rule3 */

        function f(): void {}
      `
    }
  ]
);
