[ESLint plugin](index.md) / jest/prefer-toStrictEqual

# jest/prefer-toStrictEqual

Requires "toStrictEqual" matcher instead of "toBe" for non-primitive argument types.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/jest/prefer-toStrictEqual": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
const x = {};
expect(y).toStrictEqual(x);
```

## Examples of correct code

```ts
const x = 1;
expect(y).toStrictEqual(x);
```
