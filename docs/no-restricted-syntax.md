[ESLint plugin](index.md) / no-restricted-syntax

# no-restricted-syntax

Disallows restricted syntax.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/no-restricted-syntax": "error"
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
eslint @skylib/no-restricted-syntax: [
  error,
  {
    selector: "Identifier",
    ignoreSelector: "Identifier[name=y]",
  }
]
*/
const x = 1;
```

## Examples of correct code

```ts
/*
eslint @skylib/no-restricted-syntax: [
  error,
  {
    selector: "Identifier",
    ignoreSelector: "Identifier[name=y]",
  }
]
*/
const y = 1;
```
