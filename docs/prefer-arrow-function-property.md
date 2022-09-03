[ESLint plugin](index.md) / prefer-arrow-function-property

# prefer-arrow-function-property

Requires use of arrow functions.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/prefer-arrow-function-property": "error"
  }
};
```

## Examples of incorrect code

```ts
const x = { f: function () {} };
```

## Examples of correct code

```ts
const x = { f: () => {} };
```