[ESLint plugin](index.md) / typescript/exhaustive-switch

# typescript/exhaustive-switch

Checks exhaustiveness of switch statement.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/typescript/exhaustive-switch": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
function f(x: 1 | 2): void {
  switch (x) {
    case 1:
  }
}
```

## Examples of correct code

```ts
function f(x: 1 | 2): void {
  switch (x) {
    case 1:
    case 2:
  }
}
```
