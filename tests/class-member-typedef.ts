import getCurrentLine from "get-current-line";

import classMemberTypedef from "@/rules/class-member-typedef";
import * as utils from "@/rules/utils";

utils.testRule("class-member-typedef", classMemberTypedef, [
  {
    code: `
      class C {
        x;
        constructor() {
          this.x = 1;
        }
      }

      class D {
        x: number;
        constructor() {
          this.x = 1;
        }
      }
    `,
    errors: [{ line: 2, messageId: "typedefRequired" }],
    name: `Test at line ${getCurrentLine().line}`
  }
]);
