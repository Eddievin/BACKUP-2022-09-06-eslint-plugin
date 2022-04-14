import getCurrentLine from "get-current-line";
import { rules, utils } from "@";

utils.testRule(
  "no-unsafe-object-assignment",
  rules,
  [
    {
      code: `
        interface R { readonly value: number; }
        interface W { value: number; }

        const x: R = { value: 1 };
        const y: W = { value: 1 };

        f(x);
        g(y);

        function f(x: W): void {}
        function g(x: R): void {}
      `,
      errors: [
        {
          data: { name: "value" },
          line: 7,
          messageId: "unsafeReadonlyAssignment"
        }
      ],
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        type R = { readonly [K: string]: number };
        type W = { [K: string]: number };

        const x: R = { value: 1 };
        const y: W = { value: 1 };

        f(x);
        g(y);

        function f(x: W): void {}
        function g(x: R): void {}
      `,
      errors: [
        {
          data: { name: "Index signature" },
          line: 7,
          messageId: "unsafeReadonlyAssignment"
        }
      ],
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        type R = { readonly [K: number]: number };
        type W = { [K: number]: number };

        const x: R = [1];
        const y: W = [1];

        f(x);
        g(y);

        function f(x: W): void {}
        function g(x: R): void {}
      `,
      errors: [
        {
          data: { name: "Index signature" },
          line: 7,
          messageId: "unsafeReadonlyAssignment"
        }
      ],
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        type R = { readonly value: number };
        type W = { value: number };

        function f(): W { return { value: 1 } as R; }
        function g(): R { return { value: 1 } as W; }
        function h(): void { return; }
      `,
      errors: [
        {
          data: { name: "value" },
          line: 4,
          messageId: "unsafeReadonlyAssignment"
        }
      ],
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        type R = { readonly value: number };
        type W = { value: number };

        const f1 = (): W => ({ value: 1 } as R);
        const f2 = (): R => ({ value: 1 } as W);
        const f3 = () => true;
        const f4 = (): boolean => { return true; }
      `,
      errors: [
        {
          data: { name: "value" },
          line: 4,
          messageId: "unsafeReadonlyAssignment"
        }
      ],
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        type R = { readonly value: number };
        type W = { value: number };

        const x1: R = { value: 1 };
        const x2: W = { value: 1 };

        const y1: W = x1;
        const y2: R = x2;
      `,
      errors: [
        {
          data: { name: "value" },
          line: 7,
          messageId: "unsafeReadonlyAssignment"
        }
      ],
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        type R = { readonly value: number };
        type W = { value: number };

        const x1: R = { value: 1 };
        const x2: W = { value: 1 };

        let y1: W;
        let y2: R;

        y1 = x1;
        y2 = x2;
      `,
      errors: [
        {
          data: { name: "value" },
          line: 10,
          messageId: "unsafeReadonlyAssignment"
        }
      ],
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        type R = readonly [number, number];
        type W = [number, number];

        const x: R = [1, 2];
        const y: W = x;
      `,
      errors: [
        {
          data: { name: "0" },
          line: 5,
          messageId: "unsafeReadonlyAssignment"
        }
      ],
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        const x: {} = { value: 1 };

        const y: { value?: string } = x;
      `,
      errors: [
        {
          data: { name: "value" },
          line: 3,
          messageId: "unsafeOptionalAssignment"
        }
      ],
      name: `Test at line ${getCurrentLine().line}`
    }
  ],
  [
    {
      code: `
        function f() {
          return {};
        }
      `,
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        const x: I = {};

        f({});

        interface I {
          value?: string;
        }

        function f(x: I) {}
      `,
      name: `Test at line ${getCurrentLine().line}`
    }
  ]
);
