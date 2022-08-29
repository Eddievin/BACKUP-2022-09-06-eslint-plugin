[ESLint plugin](index.md) / no-at-sign-import

# no-at-sign-import

Disallows "@" import.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/no-at-sign-import": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
import x from "@";
```

## Examples of correct code

```ts
import x from "@/folder";
```
