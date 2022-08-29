[ESLint plugin](index.md) / max-identifier-blocks

# max-identifier-blocks

Restricts identifier complexity.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/max-identifier-blocks": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
function firstSecondThirdFourthPart() {}
```

## Examples of correct code

```ts
function firstSecondThirdPart() {}
```
