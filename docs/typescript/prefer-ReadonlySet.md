[ESLint plugin](index.md) / typescript/prefer-ReadonlySet

# typescript/prefer-ReadonlySet

Disallows writable sets.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/typescript/prefer-ReadonlySet": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
function f(x: Set<string>) {}
```

## Examples of correct code

```ts
function f(x: ReadonlySet<string>) {}
```
