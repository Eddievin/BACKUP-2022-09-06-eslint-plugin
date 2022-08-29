[ESLint plugin](index.md) / wrap

# wrap

Wraps third-party rule.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/wrap": "error"
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
eslint @skylib/wrap: [
  error,
  {
    plugin: "@typescript-eslint/eslint-plugin",
    rule: "no-shadow"
  }
]
*/
const value = 1;
enum SampleEnum { value = "value" }
```

## Examples of correct code

```ts
/*
eslint @skylib/wrap: [
  error,
  {
    skip: "TSEnumDeclaration *",
    plugin: "@typescript-eslint/eslint-plugin",
    rule: "no-shadow"
  }
]
*/
const value = 1;
enum SampleEnum { value = "value" }
```
