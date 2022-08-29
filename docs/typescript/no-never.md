[ESLint plugin](index.md) / typescript/no-never

# typescript/no-never

Disallow "never" type.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/typescript/no-never": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
function f(value: "a" & "b") {}
```

## Examples of correct code

```ts
function f(value: "a" | "b") {}
```
