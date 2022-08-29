[ESLint plugin](index.md) / no-internal-modules

# no-internal-modules

Disallows importing of internal modules.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/no-internal-modules": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
import "./folder/internal";
import "package/internal";
import "@scope/package/internal";
```

## Examples of correct code

```ts
import "./folder";
import "package";
import "@scope/package";
```
