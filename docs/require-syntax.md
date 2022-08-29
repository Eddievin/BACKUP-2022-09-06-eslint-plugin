[ESLint plugin](index.md) / require-syntax

# require-syntax

Requires script to contain syntax.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/require-syntax": "error"
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
eslint @skylib/require-syntax: [
  error,
  {
    selector: "Identifier[name=x]",
    trigger: "Identifier[name=y]"
  }
]
*/
export const y = 1;
```

## Examples of correct code

```ts
/*
eslint @skylib/require-syntax: [
  error,
  {
    selector: "Identifier[name=x]",
    trigger: "Identifier[name=y]"
  }
]
*/
export const x = 1;
export const y = 1;
```
