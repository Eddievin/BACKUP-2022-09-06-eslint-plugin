[ESLint plugin](index.md) / typescript/no-empty-interfaces

# typescript/no-empty-interfaces

Disallow empty interfaces.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/typescript/no-empty-interfaces": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
interface I {}
```

## Examples of correct code

```ts
interface I {
  x: string;
}
```
