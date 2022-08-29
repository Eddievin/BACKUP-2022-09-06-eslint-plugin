[ESLint plugin](index.md) / typescript/prefer-enum

# typescript/prefer-enum

Requires using enums instead of string literals.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/typescript/prefer-enum": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
type T = "a" | "b";
```

## Examples of correct code

```ts
enum T {
  a = "a",
  b = "b"
};
```
