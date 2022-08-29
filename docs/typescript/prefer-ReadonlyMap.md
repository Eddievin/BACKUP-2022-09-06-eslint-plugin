[ESLint plugin](index.md) / typescript/prefer-ReadonlyMap

# typescript/prefer-ReadonlyMap

Disallows writable maps.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/typescript/prefer-ReadonlyMap": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
function f(x: Map<string, string>) {}
```

## Examples of correct code

```ts
function f(x: ReadonlyMap<string, string>) {}
```
