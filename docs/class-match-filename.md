[ESLint plugin](index.md) / class-match-filename

# class-match-filename

Requires class name to match filename

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/class-match-filename": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
// filename: kebab-case.ts
export class ClassName {}
```

## Examples of correct code

```ts
// filename: kebab-case.ts
export class KebabCase {}
```
