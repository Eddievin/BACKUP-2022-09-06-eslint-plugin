[ESLint plugin](index.md) / object-format

# object-format

Ensures multiline or single-line object format.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/object-format": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
const obj1 = {
  a: 1,
  b: 2,
  c: 3
};
const obj2 = { a: 1, b: 2, c: 3, d: 4 };
```

## Examples of correct code

```ts
const obj1 = { a: 1, b: 2, c: 3 };
const obj2 = {
  a: 1,
  b: 2,
  c: 3,
  d: 4
};
```
