[ESLint plugin](index.md) / typescript/no-multi-type-tuples

# typescript/no-multi-type-tuples

Disallows multi-type tuples.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/typescript/no-multi-type-tuples": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
type T = [string, number];
```

## Examples of correct code

```ts
type T = [string, string];
```
