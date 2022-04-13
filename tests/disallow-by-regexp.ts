import getCurrentLine from "get-current-line";
import disallowByRegexp from "@/rules/disallow-by-regexp";
import * as utils from "@/rules/utils";

utils.testRule("disallow-by-regexp", disallowByRegexp, [
  {
    code: `
      const a1 = [];
      const b1 = [];
      const c1 = [];
      const d1 = [];
      // a2
      // b2
      // c2
      // d2
      "a3";
      "b3";
      'c3';
      \`d3\`;
    `,
    errors: [
      { line: 1, messageId: "disallowedCode" },
      { line: 2, messageId: "disallowedCode" },
      { line: 5, messageId: "disallowedCode" },
      { line: 7, messageId: "disallowedCode" },
      { line: 9, messageId: "disallowedCode" },
      { line: 12, messageId: "disallowedCode" }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        rules: [
          { patterns: [/a(\d)/u.source], replacement: "A$1" },
          {
            contexts: ["code"],
            patterns: [/b(\d)/u.source],
            replacement: "B$1"
          },
          {
            contexts: ["comment"],
            patterns: [/c(\d)/u.source],
            replacement: "C$1"
          },
          {
            contexts: ["string"],
            patterns: [/d(\d)/u.source],
            replacement: "D$1"
          }
        ]
      }
    ],
    output: `
      const A1 = [];
      const B1 = [];
      const c1 = [];
      const d1 = [];
      // A2
      // b2
      // C2
      // d2
      "A3";
      "b3";
      'c3';
      \`D3\`;
    `
  },
  {
    code: `
      const a1 = [];
    `,
    errors: [{ line: 1, messageId: "disallowedCode" }],
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ rules: [{ patterns: [/a(\d)/u.source] }] }]
  }
]);
