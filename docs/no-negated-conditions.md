[ESLint plugin](index.md) / no-negated-conditions

# no-negated-conditions

Disallows negated conditions.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/no-negated-conditions": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
if (!x) {}
if (x !== 1) {}
```

## Examples of correct code

```ts
if (x) {}
if (x === 1) {}
```
