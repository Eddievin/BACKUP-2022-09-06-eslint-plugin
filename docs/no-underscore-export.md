[ESLint plugin](index.md) / no-underscore-export

# no-underscore-export

Disallows underscore export.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/no-underscore-export": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
export const _x = 1;
export function _f() {}
```

## Examples of correct code

```ts
export const x = 1;
export function f() {}
```
