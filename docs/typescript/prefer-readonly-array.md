[ESLint plugin](index.md) / typescript/prefer-readonly-array

# typescript/prefer-readonly-array

Disallows writable arrays.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/typescript/prefer-readonly-array": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
function f(x: string[]) {}
function g(x: [string]) {}
function h(x: Array<string>) {}
```

## Examples of correct code

```ts
function f(x: readonly string[]) {}
function g(x: readonly [string]) {}
function h(x: ReadonlyArray<string>) {}
```
