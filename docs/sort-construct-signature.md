[ESLint plugin](index.md) / sort-construct-signature

# sort-construct-signature

Requires construct signature to be first child.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/sort-construct-signature": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
interface I {
  x: string;
  new (): string;
}
```

## Examples of correct code

```ts
interface I {
  new (): string;
  x: string;
}
```
