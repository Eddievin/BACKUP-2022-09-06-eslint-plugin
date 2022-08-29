[ESLint plugin](index.md) / consistent-symbol-description

# consistent-symbol-description

Requires consistent symbol description.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/consistent-symbol-description": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
const x = Symbol("kebab-case__kebab-case");
```

## Examples of correct code

```ts
const x = Symbol("PascalCase");
```
