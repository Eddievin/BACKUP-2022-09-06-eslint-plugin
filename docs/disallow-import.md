[ESLint plugin](index.md) / disallow-import

# disallow-import

Disallows import given sources.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/disallow-import": "error"
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
eslint @skylib/disallow-import: [
  error,
  {
    disallow: "source1"
  }
]
*/
import * as source1 from "source1";
```

## Examples of correct code

```ts
/*
eslint @skylib/disallow-import: [
  error,
  {
    disallow: "source1"
  }
]
*/
import * as source2 from "source2";
```
