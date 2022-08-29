[ESLint plugin](index.md) / consistent-empty-lines

# consistent-empty-lines

Ensures consistent empty lines.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/consistent-empty-lines": "error"
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
eslint @skylib/consistent-empty-lines: [
  error,
  {
    rules: [
      {
        _id: "import",
        emptyLine: "always",
        selector: "ImportDeclaration"
      }
    ]
  }
]
*/
import x from "source1";
import y from "source2";
```

## Examples of correct code

```ts
/*
eslint @skylib/consistent-empty-lines: [
  error,
  {
    rules: [
      {
        _id: "import",
        emptyLine: "never",
        selector: "ImportDeclaration"
      }
    ]
  }
]
*/
import x from "source1";
import y from "source2";
```
