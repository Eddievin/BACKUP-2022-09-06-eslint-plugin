[ESLint plugin](index.md) / require-jsdoc

# require-jsdoc

Requires JSDoc documentation.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/require-jsdoc": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
function f(): void {}
```

## Examples of correct code

```ts
/**
 * Description.
 */
function f(): void {}
```
