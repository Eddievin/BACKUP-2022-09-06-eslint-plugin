import getCurrentLine from "get-current-line";

import disallowImport from "@/rules/disallow-import";
import * as utils from "@/rules/utils";

utils.testRule("disallow-import", disallowImport, [
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
    options: [
      {
        rules: [{ allow: ["source1", "*/source1"], disallow: ["**/source1"] }]
      }
    ]
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
    options: [{ rules: [{ allow: ["*/source1"] }] }]
  },
  {
    code: `
      import "@/source";
      import "./source";
      import "../source";
    `,
    errors: [
      { line: 1, messageId: "disallowedSource" },
      { line: 2, messageId: "disallowedSource" },
      { line: 3, messageId: "disallowedSource" }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ rules: [{ disallow: ["@/*", "./*", "../*"] }] }]
  }
]);
