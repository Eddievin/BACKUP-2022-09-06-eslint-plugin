import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

utils.testRule("sort-class-members", rules, [
  {
    code: `
      class C {
        g() {}
        f() {}
      }
    `,
    errors: [{ line: 1, messageId: "incorrectSortingOrder" }],
    name: `Test at line ${getCurrentLine().line}`,
    output: `
      class C {
        f() {}
        g() {}
      }
    `
  },
  {
    code: `
      class C {
        private f() {}
        protected g() {}
        public h() {}
      }
    `,
    errors: [{ line: 1, messageId: "incorrectSortingOrder" }],
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ sortingOrder: ["public", "protected", "private"] }],
    output: `
      class C {
        public h() {}
        protected g() {}
        private f() {}
      }
    `
  },
  {
    code: `
      class C {
        f() {}
        constructor () {}
        set x(value: number) {}
        get x(): number { return this.value; }
        value = 1;
        [key: string]: unknown;
      }
    `,
    errors: [{ line: 1, messageId: "incorrectSortingOrder" }],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        sortingOrder: [
          "signature",
          "field",
          "get",
          "set",
          "constructor",
          "method"
        ]
      }
    ],
    output: `
      class C {
        [key: string]: unknown;
        value = 1;
        get x(): number { return this.value; }
        set x(value: number) {}
        constructor () {}
        f() {}
      }
    `
  },
  {
    code: `
      class C {
        f() {}
        constructor () {}
        get z(): number { return this.value; }
        set y(value: number) {}
        get y(): number { return this.value; }
        set x(value: number) {}
        value = 1;
        [key: string]: unknown;
      }
    `,
    errors: [{ line: 1, messageId: "incorrectSortingOrder" }],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        sortingOrder: [
          "signature",
          "field",
          "accessor",
          "constructor",
          "method"
        ]
      }
    ],
    output: `
      class C {
        [key: string]: unknown;
        value = 1;
        set x(value: number) {}
        get y(): number { return this.value; }
        set y(value: number) {}
        get z(): number { return this.value; }
        constructor () {}
        f() {}
      }
    `
  },
  {
    code: `
      class C {
        /** Comment 2 */
        private value = 1;
        /** Comment 1 */
        public f() {}
      }
    `,
    errors: [{ line: 1, messageId: "incorrectSortingOrder" }],
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ sortingOrder: ["public-method", "field-private"] }],
    output: `
      class C {
        /** Comment 1 */
        public f() {}
        /** Comment 2 */
        private value = 1;
      }
    `
  },
  {
    code: `
      class C {
        f() {}
        constructor() {}
      }
    `,
    errors: [{ line: 1, messageId: "incorrectSortingOrder" }],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        sortingOrder: [
          "signature",
          "public-field",
          "public-accessor",
          "public-constructor",
          "public-method",
          "protected-field",
          "protected-accessor",
          "protected-constructor",
          "protected-method",
          "private-field",
          "private-accessor",
          "private-constructor",
          "private-method"
        ]
      }
    ],
    output: `
      class C {
        constructor() {}
        f() {}
      }
    `
  },
  {
    code: `
      class C {
        f() {}
        static g() {}
      }
    `,
    errors: [{ line: 1, messageId: "incorrectSortingOrder" }],
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ sortingOrder: ["static", "dynamic"] }],
    output: `
      class C {
        static g() {}
        f() {}
      }
    `
  },
  {
    code: `
      class C {
        f() {}
        static {}
      }
    `,
    errors: [{ line: 1, messageId: "incorrectSortingOrder" }],
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ sortingOrder: ["block", "method"] }],
    output: `
      class C {
        static {}
        f() {}
      }
    `
  },
  {
    code: `
      class C {
        "g"() {}
        "f"() {}
        *[Symbol.iterator](): Iterator<number> {}
      }
    `,
    errors: [{ line: 1, messageId: "incorrectSortingOrder" }],
    name: `Test at line ${getCurrentLine().line}`,
    output: `
      class C {
        *[Symbol.iterator](): Iterator<number> {}
        "f"() {}
        "g"() {}
      }
    `
  }
]);
