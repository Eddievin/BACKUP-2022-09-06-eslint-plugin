[ESLint plugin](index.md) / consistent-enum-members

# consistent-enum-members

Requires value to coincide with key inside enum.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/consistent-enum-members": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
enum Enum {
  a = "b"
}
```

## Examples of correct code

```ts
enum Enum {
  a = "a"
}
```
