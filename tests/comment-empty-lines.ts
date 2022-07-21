import { MessageId, commentEmptyLines } from "@/rules/comment-empty-lines";
import getCurrentLine from "get-current-line";
import { utils } from "@";

utils.testRule("comment-empty-lines", commentEmptyLines, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      <script lang="ts">
      // Comment

      /** Comment */

      function f(): void {}
      </script>
    `,
    output: `
      <script lang="ts">
      // Comment
      /** Comment */
      function f(): void {}
      </script>
    `,
    errors: [
      { line: 2, messageId: MessageId.removeEmptyLineAfter },
      { line: 4, messageId: MessageId.removeEmptyLineAfter }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      // Comment

      function f(): void {}

      /** Comment */

      function g(): void {}

      /*
      Comment
      */
      function h(): void {}
    `,
    output: `
      // Comment
      function f(): void {}

      /** Comment */
      function g(): void {}

      /*
      Comment
      */

      function h(): void {}
    `,
    errors: [
      { line: 1, messageId: MessageId.removeEmptyLineAfter },
      { line: 5, messageId: MessageId.removeEmptyLineAfter },
      { line: 9, endLine: 11, messageId: MessageId.addEmptyLineAfter }
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
      { line: 1, messageId: MessageId.removeEmptyLineAfter },
      { line: 3, messageId: MessageId.removeEmptyLineAfter },
      { line: 5, messageId: MessageId.addEmptyLineAfter }
    ]
  }
]);
