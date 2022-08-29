[ESLint plugin](index.md) / sort-call-signature

# sort-call-signature

Requires call signature to be first child.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/sort-call-signature": "error"
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
  (): string;
}
```

## Examples of correct code

```ts
interface I {
  (): string;
  x: string;
}
```
