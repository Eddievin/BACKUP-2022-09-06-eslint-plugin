[ESLint plugin](index.md) / export-matching-filename-only

# export-matching-filename-only

Requires that export matching filename is the only export.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/export-matching-filename-only": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
// filename: file.ts
export const file = 1;
export const x = 1;
```

## Examples of correct code

```ts
// filename: file.ts
export const file = 1;
```
