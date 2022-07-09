import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

utils.testRule("template-literal-format", rules, [
  {
    name: `Test at line ${getCurrentLine().line}`,
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
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      const x = \`
          template literal

          template literal
          \`;
    `,
    output: `
      const x = \`
        template literal

        template literal
      \`;
    `,
    errors: [{ line: 1, messageId: "invalidTemplateLiteralFormat" }]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      {
        const y = \`
      template literal

      template literal
      \`;
      }
    `,
    output: `
      {
        const y = \`
          template literal

          template literal
        \`;
      }
    `,
    errors: [{ line: 2, messageId: "invalidTemplateLiteralFormat" }]
  }
]);
