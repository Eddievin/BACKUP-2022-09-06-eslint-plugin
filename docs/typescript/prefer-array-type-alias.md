[ESLint plugin](index.md) / typescript/prefer-array-type-alias

# typescript/prefer-array-type-alias

Disallows unsafe "Object.assign".

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/typescript/prefer-array-type-alias": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
const x = { value: 1 } as const;

Object.assign(x, { value: 2 });
```

## Examples of correct code

```ts
const x = { value: 1 };

Object.assign(x, { value: 2 });
```
