[ESLint plugin](index.md) / restrict-identifier-characters

# restrict-identifier-characters

Requires "require()" to be assigned to variable.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/restrict-identifier-characters": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
function f() { return require("node:path"); }
```

## Examples of correct code

```ts
const path = require("node:path");
```
