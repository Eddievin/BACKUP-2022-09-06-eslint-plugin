import { MessageId, Type, consistentImport } from "@/rules/consistent-import";
import getCurrentLine from "get-current-line";
import { utils } from "@";

utils.testRule(
  "consistent-import",
  consistentImport,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        { sources: [{ _id: "id", source: "source", type: Type.wildcard }] }
      ],
      code: 'import source from "source"',
      errors: [
        {
          line: 1,
          messageId: MessageId.wildcardImportRequired,
          data: { _id: "id" }
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
              type: Type.wildcard
            }
          ]
        }
      ],
      code: 'import source from "source"',
      errors: [
        {
          line: 1,
          messageId: MessageId.wildcardImportRequired,
          data: { _id: "id" }
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
              type: Type.wildcard
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
              type: Type.wildcard
            }
          ]
        }
      ],
      code: 'import source from "source"'
    }
  ]
);
