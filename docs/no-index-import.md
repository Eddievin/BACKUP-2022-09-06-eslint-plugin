[ESLint plugin](index.md) / no-index-import

# no-index-import

Disallows "." import.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/no-index-import": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
import x from ".";
```

## Examples of correct code

```ts
import x from "./folder";
```
