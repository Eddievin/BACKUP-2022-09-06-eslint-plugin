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
| sources.\<index\>._id | Id | - |
| sources.\<index\>.altLocalNames | Alternative local names | [] |
| sources.\<index\>.autoImport | Enable auto-import | false |
| sources.\<index\>.autoImportSource | Auto-import source (defaults to "source") | - |
| sources.\<index\>.localName | Local name | - |
| sources.\<index\>.source | Source | - |
| sources.\<index\>.sourcePattern | Soure pattern (minimatch) | - |
| sources.\<index\>.wildcard | Prefer wildcard import | false |

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