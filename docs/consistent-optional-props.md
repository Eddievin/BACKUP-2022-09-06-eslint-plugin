[ESLint plugin](index.md) / consistent-optional-props

# consistent-optional-props

Ensures consistent optional property style:
- x?: T | undefined
- x?: T
- x: T | undefined

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/consistent-optional-props": "error"
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
  x?: string;
  y: string | undefined;
}
```

## Examples of correct code

```ts
interface I {
  x?: string | undefined;
  y?: string | undefined;
}
```
