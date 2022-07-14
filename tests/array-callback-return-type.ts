import {
  MessageId,
  arrayCallbackReturnType
} from "@/rules/array-callback-return-type";
import getCurrentLine from "get-current-line";
import { utils } from "@";

utils.testRule(
  "array-callback-return-type",
  arrayCallbackReturnType,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        <script lang="ts">
        [1, true].every(x => x);
        </script>
        <template>
          <div :prop="[1, true].every(x => x)"></div>
        </template>
      `,
      errors: [{ line: 2, messageId: MessageId.invalidType }]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        [1].some(x => x);
        [""].some(x => x);
        [false].some(x => x);
        [1].some((x): true | undefined => x);
        [1].some((x): object | undefined => x);
        [1].some((x): symbol | undefined => x);
        [1].some((x): {} | undefined => x);
      `
    }
  ]
);
