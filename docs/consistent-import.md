[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / consistent-import

# consistent-import

Requires consistent import.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/consistent-import": [
      "error",
      {
        sources: [
          {
            _id: string,
            altLocalNames: string[],
            autoImport: boolean,
            autoImportSource: string,
            localName: string,
            source: string,
            sourcePattern: string,
            wildcard: boolean
          },
          ...
        ]
      }
    ]
  }
};
```

| Name | Description | Default value |
| :----- | :----- | :----- |
| rules._id | Id |
| rules.altLocalNames | Alternative local names |
| rules.autoImport | Enable auto-import |
| rules.autoImportSource | Auto-import source (defaults to "source") |
| rules.localName | Local name |
| rules.source | Source |
| rules.sourcePattern | Soure pattern (minimatch) |
| rules.wildcard | Prefer wildcard import |

## Examples of incorrect code

```ts
/*
eslint @skylib/consistent-import: [
  error,
  {
    sources: [
      {
        _id: "catch-all",
        source: "**"
      },
      {
        _id: "source2",
        source: "source2",
        wildcard: true
      }
    ]
  }
]
*/
import * as source1 from "source1"; // Wildcard import disallowed
import { item1 } from "source2"; // Wildcard import required
import * as invalidLocalName from "source2"; // Invalid local name
```

## Examples of correct code

```ts
/*
eslint @skylib/consistent-import: [
  error,
  {
    sources: [
      {
        _id: "catch-all",
        source: "**"
      },
      {
        _id: "source2",
        source: "source2",
        wildcard: true
      }
    ]
  }
]
*/
import { item1 } from "source1";
import * as source2 from "source2";
```