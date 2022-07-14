import { MessageId, noMultiTypeTuples } from "@/rules/no-multi-type-tuples";
import getCurrentLine from "get-current-line";
import { utils } from "@";

utils.testRule("no-multi-type-tuples", noMultiTypeTuples, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      type T1 = [string, number];
      type T2 = [string, string];
    `,
    errors: [{ messageId: MessageId.noMultiTypeTuples }]
  }
]);
