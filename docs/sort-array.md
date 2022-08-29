[ESLint plugin](index.md) / sort-array

# sort-array

Sorts arrays.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/sort-array": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
// @sorted
const x = [2, 1];
```

## Examples of correct code

```ts
const x = [2, 1];
// @sorted
const y = [1, 2];
```
