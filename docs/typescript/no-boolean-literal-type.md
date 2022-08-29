[ESLint plugin](index.md) / typescript/no-boolean-literal-type

# typescript/no-boolean-literal-type

Disallows boolean literal type.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/typescript/no-boolean-literal-type": "error"
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
  x?: true;
  y?: false;
}
```

## Examples of correct code

```ts
interface I {
  x?: boolean;
}
```
