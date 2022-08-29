[ESLint plugin](index.md) / consistent-import

# consistent-import

Requires consistent import.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/consistent-import": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


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
