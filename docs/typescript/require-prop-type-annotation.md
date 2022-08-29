[ESLint plugin](index.md) / typescript/require-prop-type-annotation

# typescript/require-prop-type-annotation

Requires type annotation for class properties.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/typescript/require-prop-type-annotation": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
class C {
  x;
}
```

## Examples of correct code

```ts
class C {
  x: string;
  y = "";
}
```
