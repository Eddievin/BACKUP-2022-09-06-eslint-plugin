import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["no-sibling-import"];

const MessageId = utils.getMessageId(rule);

utils.testRule(
  "no-sibling-import",
  rule,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ exclusions: ["source2"] }],
      code: `
        import * as source1 from "./source1";
        import * as source2 from "./source2";
        import * as source3 from "../source3";
        import * as subfolder from "./subfolder";
        require("node:fs");
      `,
      errors: [{ line: 1, messageId: MessageId.disallowedSource }]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "subfolder/index.ts",
      options: [{ exclusions: ["source2"] }],
      code: `
        import * as source1 from "./source1";
        import * as source2 from "./source2";
        import * as source3 from "../source3";
        import * as subfolder from "./subfolder";
        require("node:fs");
      `
    }
  ]
);
