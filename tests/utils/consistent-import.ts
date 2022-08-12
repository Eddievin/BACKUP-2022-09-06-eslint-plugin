import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["consistent-import"];

const MessageId = utils.getMessageId(rule);

utils.testRule(
  "consistent-import",
  rule,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ sources: [{ _id: "id", source: "source", wildcard: true }] }],
      code: 'import source from "source"',
      errors: [
        {
          line: 1,
          messageId: MessageId.wildcardRequired,
          data: { _id: "id", source: "source" }
        }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          sources: [
            {
              _id: "id",
              filesToLint: ["./fixtures/file.ts"],
              filesToSkip: ["./fixtures/**", "./other/**"],
              source: "source",
              wildcard: true
            }
          ]
        }
      ],
      code: 'import source from "source"',
      errors: [
        {
          line: 1,
          messageId: MessageId.wildcardRequired,
          data: { _id: "id", source: "source" }
        }
      ]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          sources: [
            {
              _id: "id",
              filesToSkip: ["./fixtures/**"],
              source: "source",
              wildcard: true
            }
          ]
        }
      ],
      code: 'import source from "source"'
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          sources: [
            {
              _id: "id",
              filesToLint: ["./other/**"],
              source: "source",
              wildcard: true
            }
          ]
        }
      ],
      code: 'import source from "source"'
    }
  ]
);
