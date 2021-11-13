import getCurrentLine from "get-current-line";

import consistentImport from "@/rules/consistent-import";
import * as utils from "@/rules/utils";

utils.testRule(
  "consistent-import",
  consistentImport,
  [
    {
      code: `
        localName1;
        localName1;

        localName2;
        localName2;

        const obj = {};

        obj.localName3;

        const localName4 = 1;

        function localName5() {}

        class localName6 {}

        namespace localName7 {}
      `,
      errors: [
        { line: 1, messageId: "missingImport" },
        { line: 1, messageId: "autoImport" },
        { line: 2, messageId: "missingImport" },
        { line: 4, messageId: "missingImport" },
        { line: 5, messageId: "missingImport" }
      ],
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          sources: [
            {
              localName: "localName1",
              sourcePattern: "source1",
              type: "default"
            },
            {
              localName: "localName2",
              sourcePattern: "source2",
              type: "wildcard"
            },
            {
              localName: "localName3",
              sourcePattern: "source3",
              type: "wildcard"
            },
            {
              localName: "localName4",
              sourcePattern: "source4",
              type: "wildcard"
            },
            {
              localName: "localName5",
              sourcePattern: "source5",
              type: "wildcard"
            },
            {
              localName: "localName6",
              sourcePattern: "source6",
              type: "wildcard"
            },
            {
              localName: "localName7",
              sourcePattern: "source7",
              type: "wildcard"
            }
          ]
        }
      ],
      output: `
        import localName1 from "source1";
        import * as localName2 from "source2";
        localName1;
        localName1;

        localName2;
        localName2;

        const obj = {};

        obj.localName3;

        const localName4 = 1;

        function localName5() {}

        class localName6 {}

        namespace localName7 {}
      `
    },
    {
      code: `
        source;
      `,
      errors: [
        { line: 1, messageId: "missingImport" },
        { line: 1, messageId: "autoImport" }
      ],
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          sources: [
            {
              autoImportSource: "@/source",
              sourcePattern: "@skylib/eslint-plugin/src/source",
              type: "wildcard"
            }
          ]
        }
      ],
      output: `
        import * as source from "@/source";
        source;
      `
    },
    {
      code: `
        const x = { source };
      `,
      errors: [
        { line: 1, messageId: "autoImport" },
        { line: 1, messageId: "missingImport" }
      ],
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          sources: [
            {
              autoImportSource: "@/source",
              sourcePattern: "@skylib/eslint-plugin/src/source",
              type: "wildcard"
            }
          ]
        }
      ],
      output: `
        import * as source from "@/source";
        const x = { source };
      `
    },
    {
      code: `
        import localName1 from "source1";
        import { localName2 } from "source2";
        import * as localName3 from "source3";
        import * as localName4 from "source4";
      `,
      errors: [
        { line: 1, messageId: "wildcardImportRequired" },
        { line: 2, messageId: "wildcardImportRequired" },
        { line: 3, messageId: "wildcardImportDisallowed" },
        { line: 4, messageId: "wildcardImportDisallowed" }
      ],
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          sources: [
            {
              localName: "localName1",
              sourcePattern: "source1",
              type: "wildcard"
            },
            {
              localName: "localName2",
              sourcePattern: "source2",
              type: "wildcard"
            },
            {
              localName: "localName3",
              sourcePattern: "source3",
              type: "default"
            }
          ]
        }
      ]
    },
    {
      code: `
        import wrongName1 from "source1";
        import * as wrongName2 from "source2";
      `,
      errors: [
        {
          data: { expectedLocalName: '"localName1"' },
          line: 1,
          messageId: "invalidLocalName"
        },
        {
          data: { expectedLocalName: '"localName2"' },
          line: 2,
          messageId: "invalidLocalName"
        }
      ],
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          sources: [
            {
              localName: "localName1",
              sourcePattern: "source1",
              type: "default"
            },
            {
              localName: "localName2",
              sourcePattern: "source2",
              type: "wildcard"
            }
          ]
        }
      ]
    },
    {
      code: `
        import wrongName1 from "source1";
        import localName2 from "source2";
        import altName3 from "source3";
        import * as wrongName4 from "source4";
        import * as localName5 from "source5";
        import * as altName6 from "source6";

        const localName1 = 1;
        const localName3 = 1;
        const localName4 = 1;
        const localName6 = 1;
      `,
      errors: [
        {
          data: { expectedLocalName: '"altName1"' },
          line: 1,
          messageId: "invalidLocalName"
        },
        {
          data: { expectedLocalName: '"altName4"' },
          line: 4,
          messageId: "invalidLocalName"
        }
      ],
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          sources: [
            {
              altLocalNames: ["altName1"],
              localName: "localName1",
              sourcePattern: "source1",
              type: "default"
            },
            {
              altLocalNames: ["altName2"],
              localName: "localName2",
              sourcePattern: "source2",
              type: "default"
            },
            {
              altLocalNames: ["altName3"],
              localName: "localName3",
              sourcePattern: "source3",
              type: "default"
            },
            {
              altLocalNames: ["altName4"],
              localName: "localName4",
              sourcePattern: "source4",
              type: "wildcard"
            },
            {
              altLocalNames: ["altName5"],
              localName: "localName5",
              sourcePattern: "source5",
              type: "wildcard"
            },
            {
              altLocalNames: ["altName6"],
              localName: "localName6",
              sourcePattern: "source6",
              type: "wildcard"
            }
          ]
        }
      ]
    },
    {
      code: `
        import wrongName from "source1";
        import source2 from "source2";
      `,
      errors: [
        {
          data: { expectedLocalName: '"source1"' },
          line: 1,
          messageId: "invalidLocalName"
        }
      ],
      name: `Test at line ${getCurrentLine().line}`
    }
  ],
  [
    {
      code: `
        import localName1, { anyName1, anyName2 } from "source1";
        import * as localName2 from "source2";
      `,
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          sources: [
            {
              localName: "localName1",
              sourcePattern: "source1",
              type: "default"
            },
            {
              localName: "localName2",
              sourcePattern: "source2",
              type: "wildcard"
            }
          ]
        }
      ]
    },
    {
      code: `
        import * as source1 from "@/source1";
        import * as source2 from "./source2";
        import * as source3 from "../source3";
      `,
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          sources: [
            {
              sourcePattern: "@skylib/eslint-plugin/src/source1",
              type: "wildcard"
            },
            {
              sourcePattern: "@skylib/eslint-plugin/fixtures/source2",
              type: "wildcard"
            },
            {
              sourcePattern: "@skylib/eslint-plugin/source3",
              type: "wildcard"
            }
          ]
        }
      ]
    },
    {
      code: `
        import * as someSource from "@/some-source";
      `,
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          sources: [
            {
              sourcePattern: "@skylib/eslint-plugin/src/some-source",
              type: "wildcard"
            }
          ]
        }
      ]
    },
    {
      code: `
        import * as fixtures from ".";
      `,
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          sources: [
            {
              sourcePattern: "@skylib/eslint-plugin/fixtures",
              type: "wildcard"
            }
          ]
        }
      ]
    }
  ]
);
