import {
  MessageId,
  emptyLinesAroundComment
} from "@/rules/empty-lines-around-comment";
import getCurrentLine from "get-current-line";
import { utils } from "@";

utils.testRule(
  "empty-lines-around-comment",
  emptyLinesAroundComment,
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
        { messageId: MessageId.unexpectedEmptyLineAfter },
        {
          line: 5,
          endLine: 7,
          messageId: MessageId.missingEmptyLineAfter
        },
        { line: 10, messageId: MessageId.unexpectedEmptyLineAfter }
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
        { line: 5, messageId: MessageId.unexpectedEmptyLineAfter },
        {
          line: 12,
          endLine: 14,
          messageId: MessageId.missingEmptyLineAfter
        },
        {
          line: 19,
          endLine: 21,
          messageId: MessageId.unexpectedEmptyLineAfter
        }
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
        { line: 2, messageId: MessageId.missingEmptyLineBefore },
        { line: 3, messageId: MessageId.missingEmptyLineBefore },
        { line: 3, messageId: MessageId.missingEmptyLineAfter }
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
