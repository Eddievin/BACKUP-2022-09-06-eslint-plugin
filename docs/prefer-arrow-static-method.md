[ESLint plugin](index.md) / prefer-arrow-static-method

# prefer-arrow-static-method

Requires use of arrow static methods.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/prefer-arrow-static-method": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
class C { static f() {} }
```

## Examples of correct code

```ts
class C { static f = () => {}; }
```
