[ESLint plugin](index.md) / typescript/no-complex-return-type

# typescript/no-complex-return-type

Disallow complex function return types.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/typescript/no-complex-return-type": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
function f() {
  return { x: 1 };
}
```

## Examples of correct code

```ts
function f(): object {
  return { x: 1 };
}
```
