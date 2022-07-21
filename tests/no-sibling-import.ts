import { MessageId, noSiblingImport } from "@/rules/no-sibling-import";
import getCurrentLine from "get-current-line";
import { utils } from "@";

utils.testRule("no-sibling-import", noSiblingImport, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ exclusions: ["source2"] }],
    code: `
      import * as source1 from "./source1";
      import * as source2 from "./source2";
      import * as subfolder from "./subfolder";
    `,
    errors: [{ line: 1, messageId: MessageId.disallowedSource }]
  }
]);
