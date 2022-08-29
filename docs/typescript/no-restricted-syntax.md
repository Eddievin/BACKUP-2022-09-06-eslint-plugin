[ESLint plugin](index.md) / typescript/no-restricted-syntax

# typescript/no-restricted-syntax

Disallows restricted syntax.

```ts
type TypeGroup =
  | "any"
  | "array"
  | "boolean"
  | "complex"
  | "function"
  | "never"
  | "null"
  | "number"
  | "object"
  | "parameter"
  | "readonly"
  | "string"
  | "symbol"
  | "tuple"
  | "undefined"
  | "unknown";
```

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/typescript/no-restricted-syntax": "error"
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
    typeIs: "number"
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
    typeIs: "number"
  }
]
*/
const x = "";
```
