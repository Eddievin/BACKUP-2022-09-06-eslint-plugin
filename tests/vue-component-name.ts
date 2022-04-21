import getCurrentLine from "get-current-line";
import { rules, utils } from "@";

utils.testRule(
  "vue-component-name",
  rules,
  [
    {
      code: `
        export default defineComponent({
          name: "name"
        });
      `,
      errors: [{ line: 1, messageId: "invalidName" }],
      name: `Test at line ${getCurrentLine().line}`
    }
  ],
  [
    {
      code: `
        export default defineComponent({
          name: "file"
        });
      `,
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        export default defineComponent({
          name: "prefix-file"
        });
      `,
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ prefix: "prefix-" }]
    },
    {
      code: `
        export default defineComponent({
          name: "file-suffix"
        });
      `,
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ suffix: "-suffix" }]
    }
  ]
);
