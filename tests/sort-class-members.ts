import getCurrentLine from "get-current-line";
import { sortClassMembers } from "@/rules/sort-class-members";
import { utils } from "@";

const { MessageId } = utils.sort;

utils.testRule("sort-class-members", sortClassMembers, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      class C {
        f1() {}
        f3() {}
        f2() {}
        f4() {}
      }
    `,
    output: `
      class C {
        f1() {}
        f2() {}
        f3() {}
        f4() {}
      }
    `,
    errors: [
      { line: 3, endLine: 4, messageId: MessageId.incorrectSortingOrder }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ sortingOrder: ["public", "protected", "private"] }],
    code: `
      class C {
        private f() {}
        protected g() {}
        public h() {}
      }
    `,
    output: `
      class C {
        public h() {}
        protected g() {}
        private f() {}
      }
    `,
    errors: [
      { line: 2, endLine: 4, messageId: MessageId.incorrectSortingOrder }
    ]
  },
  {
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
    output: `
      class C {
        [key: string]: unknown;
        value = 1;
        get x(): number { return this.value; }
        set x(value: number) {}
        constructor () {}
        f() {}
      }
    `,
    errors: [
      { line: 2, endLine: 7, messageId: MessageId.incorrectSortingOrder }
    ]
  },
  {
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
    `,
    errors: [
      { line: 2, endLine: 9, messageId: MessageId.incorrectSortingOrder }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ sortingOrder: ["public-method", "field-private"] }],
    code: `
      class C {
        /** Comment 2 */
        private value = 1;
        /** Comment 1 */
        public f() {}
      }
    `,
    output: `
      class C {
        /** Comment 1 */
        public f() {}
        /** Comment 2 */
        private value = 1;
      }
    `,
    errors: [
      { line: 3, endLine: 5, messageId: MessageId.incorrectSortingOrder }
    ]
  },
  {
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
    code: `
      class C {
        f() {}
        constructor() {}
      }
    `,
    output: `
      class C {
        constructor() {}
        f() {}
      }
    `,
    errors: [
      { line: 2, endLine: 3, messageId: MessageId.incorrectSortingOrder }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ sortingOrder: ["static", "dynamic"] }],
    code: `
      class C {
        f() {}
        static g() {}
      }
    `,
    output: `
      class C {
        static g() {}
        f() {}
      }
    `,
    errors: [
      { line: 2, endLine: 3, messageId: MessageId.incorrectSortingOrder }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ sortingOrder: ["block", "method"] }],
    code: `
      class C {
        f() {}
        static {}
      }
    `,
    output: `
      class C {
        static {}
        f() {}
      }
    `,
    errors: [
      { line: 2, endLine: 3, messageId: MessageId.incorrectSortingOrder }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      class C {
        "g"() {}
        "f"() {}
        *[Symbol.iterator](): Iterator<number> {}
      }
    `,
    output: `
      class C {
        *[Symbol.iterator](): Iterator<number> {}
        "f"() {}
        "g"() {}
      }
    `,
    errors: [
      { line: 2, endLine: 4, messageId: MessageId.incorrectSortingOrder }
    ]
  }
]);
