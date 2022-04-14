import getCurrentLine from "get-current-line";
import { rules, utils } from "@";

utils.testRule("exhaustive-switch", rules, [
  {
    code: `
      const symbol = Symbol("Test");

      function f01(x: 1 | "a" | typeof symbol): void {
        switch (x) {
          case "a":
          case symbol:
        }
      }

      function f02(x: 1 | "a" | typeof symbol): void {
        switch (x) {
          case 1:
          case symbol:
        }
      }

      function f03(x: 1 | "a" | typeof symbol): void {
        switch (x) {
          case 1:
          case "a":
        }
      }

      function f04(x: 1 | "a" | typeof symbol): void {
        switch (x) {
          case 1:
          case "a":
          case symbol:
        }
      }

      function f05(x: 1 | "a" | typeof symbol): void {
        switch (x) {
          default:
        }
      }
    `,
    errors: [
      { line: 4, messageId: "inexhaustiveSwitch" },
      { line: 11, messageId: "inexhaustiveSwitch" },
      { line: 18, messageId: "inexhaustiveSwitch" }
    ],
    name: `Test at line ${getCurrentLine().line}`
  },
  {
    code: `
      const symbol = Symbol("Test");

      function f01(x: 1n | true | (() => void) | 1 | null | "a" | typeof symbol | undefined): void {
        switch (typeof x) {
          case "boolean":
          case "function":
          case "number":
          case "object":
          case "string":
          case "symbol":
          case "undefined":
        }
      }

      function f02(x: 1n | true | (() => void) | 1 | null | "a" | typeof symbol | undefined): void {
        switch (typeof x) {
          case "bigint":
          case "function":
          case "number":
          case "object":
          case "string":
          case "symbol":
          case "undefined":
        }
      }

      function f03(x: 1n | true | (() => void) | 1 | null | "a" | typeof symbol | undefined): void {
        switch (typeof x) {
          case "bigint":
          case "boolean":
          case "number":
          case "object":
          case "string":
          case "symbol":
          case "undefined":
        }
      }

      function f04(x: 1n | true | (() => void) | 1 | null | "a" | typeof symbol | undefined): void {
        switch (typeof x) {
          case "bigint":
          case "boolean":
          case "function":
          case "object":
          case "string":
          case "symbol":
          case "undefined":
        }
      }

      function f05(x: 1n | true | (() => void) | 1 | null | "a" | typeof symbol | undefined): void {
        switch (typeof x) {
          case "bigint":
          case "boolean":
          case "function":
          case "number":
          case "string":
          case "symbol":
          case "undefined":
        }
      }

      function f06(x: 1n | true | (() => void) | 1 | null | "a" | typeof symbol | undefined): void {
        switch (typeof x) {
          case "bigint":
          case "boolean":
          case "function":
          case "number":
          case "object":
          case "symbol":
          case "undefined":
        }
      }

      function f07(x: 1n | true | (() => void) | 1 | null | "a" | typeof symbol | undefined): void {
        switch (typeof x) {
          case "bigint":
          case "boolean":
          case "function":
          case "number":
          case "object":
          case "string":
          case "undefined":
        }
      }

      function f08(x: 1n | true | (() => void) | 1 | null | "a" | typeof symbol | undefined): void {
        switch (typeof x) {
          case "bigint":
          case "boolean":
          case "function":
          case "number":
          case "object":
          case "string":
          case "symbol":
        }
      }

      function f09(x: 1n | true | (() => void) | 1 | null | "a" | typeof symbol | undefined): void {
        switch (typeof x) {
          case "bigint":
          case "boolean":
          case "function":
          case "number":
          case "object":
          case "string":
          case "symbol":
          case "undefined":
        }
      }

      function f10(x: 1n | true | (() => void) | 1 | null | "a" | typeof symbol | undefined): void {
        switch (typeof x) {
          default:
        }
      }
    `,
    errors: [
      { line: 4, messageId: "inexhaustiveSwitch" },
      { line: 16, messageId: "inexhaustiveSwitch" },
      { line: 28, messageId: "inexhaustiveSwitch" },
      { line: 40, messageId: "inexhaustiveSwitch" },
      { line: 52, messageId: "inexhaustiveSwitch" },
      { line: 64, messageId: "inexhaustiveSwitch" },
      { line: 76, messageId: "inexhaustiveSwitch" },
      { line: 88, messageId: "inexhaustiveSwitch" }
    ],
    name: `Test at line ${getCurrentLine().line}`
  },
  {
    code: `
      const symbol = Symbol("Test");

      function f01(x: bigint | boolean | (new () => object) | number | {} | string | symbol | void): void {
        switch (typeof x) {
          case "boolean":
          case "function":
          case "number":
          case "object":
          case "string":
          case "symbol":
          case "undefined":
        }
      }

      function f02(x: bigint | boolean | (new () => object) | number | {} | string | symbol | void): void {
        switch (typeof x) {
          case "bigint":
          case "function":
          case "number":
          case "object":
          case "string":
          case "symbol":
          case "undefined":
        }
      }

      function f03(x: bigint | boolean | (new () => object) | number | {} | string | symbol | void): void {
        switch (typeof x) {
          case "bigint":
          case "boolean":
          case "number":
          case "object":
          case "string":
          case "symbol":
          case "undefined":
        }
      }

      function f04(x: bigint | boolean | (new () => object) | number | {} | string | symbol | void): void {
        switch (typeof x) {
          case "bigint":
          case "boolean":
          case "function":
          case "object":
          case "string":
          case "symbol":
          case "undefined":
        }
      }

      function f05(x: bigint | boolean | (new () => object) | number | {} | string | symbol | void): void {
        switch (typeof x) {
          case "bigint":
          case "boolean":
          case "function":
          case "number":
          case "string":
          case "symbol":
          case "undefined":
        }
      }

      function f06(x: bigint | boolean | (new () => object) | number | {} | string | symbol | void): void {
        switch (typeof x) {
          case "bigint":
          case "boolean":
          case "function":
          case "number":
          case "object":
          case "symbol":
          case "undefined":
        }
      }

      function f07(x: bigint | boolean | (new () => object) | number | {} | string | symbol | void): void {
        switch (typeof x) {
          case "bigint":
          case "boolean":
          case "function":
          case "number":
          case "object":
          case "string":
          case "undefined":
        }
      }

      function f08(x: bigint | boolean | (new () => object) | number | {} | string | symbol | void): void {
        switch (typeof x) {
          case "bigint":
          case "boolean":
          case "function":
          case "number":
          case "object":
          case "string":
          case "symbol":
        }
      }

      function f09(x: bigint | boolean | (new () => object) | number | {} | string | symbol | void): void {
        switch (typeof x) {
          case "bigint":
          case "boolean":
          case "function":
          case "number":
          case "object":
          case "string":
          case "symbol":
          case "undefined":
        }
      }

      function f10(x: bigint | boolean | (new () => object) | number | {} | string | symbol | void): void {
        switch (typeof x) {
          default:
        }
      }
    `,
    errors: [
      { line: 4, messageId: "inexhaustiveSwitch" },
      { line: 16, messageId: "inexhaustiveSwitch" },
      { line: 28, messageId: "inexhaustiveSwitch" },
      { line: 40, messageId: "inexhaustiveSwitch" },
      { line: 52, messageId: "inexhaustiveSwitch" },
      { line: 64, messageId: "inexhaustiveSwitch" },
      { line: 76, messageId: "inexhaustiveSwitch" },
      { line: 88, messageId: "inexhaustiveSwitch" }
    ],
    name: `Test at line ${getCurrentLine().line}`
  }
]);
