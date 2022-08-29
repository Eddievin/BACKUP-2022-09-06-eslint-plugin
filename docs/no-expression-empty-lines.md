[ESLint plugin](index.md) / no-expression-empty-lines

# no-expression-empty-lines

Disallows empty lines inside expressions.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/no-expression-empty-lines": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
const result = []

  .map(x => x)

  .map(x => x);
```

## Examples of correct code

```ts
const result = []
  .map(x => x)
  .map(x => x);
```
