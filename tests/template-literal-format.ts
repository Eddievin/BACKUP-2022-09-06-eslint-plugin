import getCurrentLine from "get-current-line";
import { rules, utils } from "@";

utils.testRule("template-literal-format", rules, [
  {
    code: `
      const x = \`template literal\`;

      const y = \`template literal
        \`;

      const y = \`
        template literal\`;
    `,
    errors: [
      { line: 3, messageId: "invalidTemplateLiteralFormat" },
      { line: 6, messageId: "invalidTemplateLiteralFormat" }
    ],
    name: `Test at line ${getCurrentLine().line}`
  },
  {
    code: `
      const x = \`
          template literal

          template literal
          \`;
    `,
    errors: [{ line: 1, messageId: "invalidTemplateLiteralFormat" }],
    name: `Test at line ${getCurrentLine().line}`,
    output: `
      const x = \`
        template literal

        template literal
      \`;
    `
  },
  {
    code: `
      {
        const y = \`
      template literal

      template literal
      \`;
      }
    `,
    errors: [{ line: 2, messageId: "invalidTemplateLiteralFormat" }],
    name: `Test at line ${getCurrentLine().line}`,
    output: `
      {
        const y = \`
          template literal

          template literal
        \`;
      }
    `
  }
]);
