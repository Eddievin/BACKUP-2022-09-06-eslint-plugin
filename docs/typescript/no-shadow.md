[ESLint plugin](index.md) / typescript/no-shadow

# typescript/no-shadow

This rule wraps "@typescript-eslint/no-shadow" rule, but skips checking enum.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/typescript/no-shadow": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
const x = 1;
function f() { const x = 1; }
```

## Examples of correct code

```ts
const x = 1;
enum E { x = "x" }
```
