[ESLint plugin](index.md) / template-literal-format

# template-literal-format

Ensures consistent padding in template literals.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/template-literal-format": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
const x = `
    text
    `;
```

## Examples of correct code

```ts
const x = `
  text
`;
```
