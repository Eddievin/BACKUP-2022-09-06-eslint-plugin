import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

utils.testRule("class-member-typedef", rules, [
  {
    name: `Test at line ${getCurrentLine().line}`,
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
    errors: [{ line: 2, messageId: "typedefRequired" }]
  }
]);
