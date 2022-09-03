[ESLint plugin](index.md) / typescript/no-unsafe-object-assign

# typescript/no-unsafe-object-assign

Disallows unsafe "Object.assign".

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/typescript/no-unsafe-object-assign": "error"
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