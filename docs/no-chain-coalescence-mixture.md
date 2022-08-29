[ESLint plugin](index.md) / no-chain-coalescence-mixture

# no-chain-coalescence-mixture

Disallows mixing of chain and coalescence operators.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/no-chain-coalescence-mixture": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
x?.y ?? z;
```

## Examples of correct code

```ts
x?.y;
x ?? y;
```
