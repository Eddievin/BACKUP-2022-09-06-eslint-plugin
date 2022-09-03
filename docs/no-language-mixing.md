[ESLint plugin](index.md) / no-language-mixing

# no-language-mixing

Disallows langauge mixing.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/no-language-mixing": "error"
  }
};
```

## Examples of incorrect code

```ts
const x = "xyz123абв";
```

## Examples of correct code

```ts
const x = "xyz";
const y = "123";
const z = "абв";
```