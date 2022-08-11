import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["typescript/no-complex-declarator-type"];

const MessageId = utils.getMessageId(rule);

utils.testRule(
  "no-complex-declarator-type",
  rule,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        const x1 = { value: 1 };
        const [x2, x3] = [1, { value: 1 }];
        const { x4, x5: x6 } = { x4: 1, x5: { value: 1 } };
        const y1 = { value: 1 } as const;
        const [y2, y3] = [1, { value: 1 }] as const;
        const { y4, y5: y6 } = { y4: 1, y5: { value: 1 } } as const;
        const z1: I = { value: 1 };
        const [z2, z3] = [1, 2];
        const { z4, z5: z6 } = { z4: 1, z5: 2 };
      `,
      errors: [
        { line: 1, messageId: MessageId.customMessage },
        { line: 2, messageId: MessageId.customMessage },
        { line: 3, messageId: MessageId.customMessage }
      ]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: "const x = new Map();"
    }
  ]
);
