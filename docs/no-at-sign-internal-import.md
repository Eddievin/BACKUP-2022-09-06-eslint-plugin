[ESLint plugin](index.md) / no-at-sign-internal-import

# no-at-sign-internal-import

Disallows "@/**" import.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/no-at-sign-internal-import": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
import x from "@/folder";
```

## Examples of correct code

```ts
import x from "@";
```
