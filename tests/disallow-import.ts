import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

utils.testRule("disallow-import", rules, [
  {
    code: `
      import "source1";
      import "a/source1";
      import "a/b/source1";
      import "source2";
      import "a/source2";
      import "a/b/source2";
    `,
    errors: [{ line: 3, messageId: "disallowedSource" }],
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ allow: ["source1", "*/source1"], disallow: ["**/source1"] }]
  },
  {
    code: `
      import "source1";
      import "a/source1";
      import "a/b/source1";
      import "source2";
      import "a/source2";
      import "a/b/source2";
    `,
    errors: [
      { line: 1, messageId: "disallowedSource" },
      { line: 3, messageId: "disallowedSource" },
      { line: 4, messageId: "disallowedSource" },
      { line: 5, messageId: "disallowedSource" },
      { line: 6, messageId: "disallowedSource" }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ allow: ["*/source1"] }]
  },
  {
    code: `
      import "@/source";
      import "./source";
      import "../source";
      import "source";
    `,
    errors: [
      { line: 1, messageId: "disallowedSource" },
      { line: 2, messageId: "disallowedSource" },
      { line: 3, messageId: "disallowedSource" }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ disallow: ["@/*", "./*", "../*"] }]
  },
  {
    code: `
      const x1 = import("@/source");
      const x2 = import("./source");
      const x3 = import("../source");
      const x4 = import("source");
    `,
    errors: [
      { line: 1, messageId: "disallowedSource" },
      { line: 2, messageId: "disallowedSource" },
      { line: 3, messageId: "disallowedSource" }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ disallow: ["@/*", "./*", "../*"] }]
  },
  {
    code: `
      const x1 = require("@/source");
      const x2 = require("./source");
      const x3 = require("../source");
      const x4 = require("source");
    `,
    errors: [
      { line: 1, messageId: "disallowedSource" },
      { line: 2, messageId: "disallowedSource" },
      { line: 3, messageId: "disallowedSource" }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ disallow: ["@/*", "./*", "../*"] }]
  },
  {
    code: `
      export * from "@/source";
      export * from "./source";
      export * from "../source";
      export * from "source";
    `,
    errors: [
      { line: 1, messageId: "disallowedSource" },
      { line: 2, messageId: "disallowedSource" },
      { line: 3, messageId: "disallowedSource" }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ disallow: ["@/*", "./*", "../*"] }]
  },
  {
    code: `
      export { x1 } from "@/source";
      export { x2 } from "./source";
      export { x3 } from "../source";
      export { x4 } from "source";
    `,
    errors: [
      { line: 1, messageId: "disallowedSource" },
      { line: 2, messageId: "disallowedSource" },
      { line: 3, messageId: "disallowedSource" }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ disallow: ["@/*", "./*", "../*"] }]
  }
]);
