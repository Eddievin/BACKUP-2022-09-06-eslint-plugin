[ESLint plugin](index.md) / consistent-source-extension

# consistent-source-extension

Requires consistent import/export source extension.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/consistent-source-extension": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
import x1 from "source1.js";
import x2 from "source2.json";
import x3 from "source3.ts";
```

## Examples of correct code

```ts
import x1 from "source1";
import x2 from "source2";
import x3 from "source3";
```
