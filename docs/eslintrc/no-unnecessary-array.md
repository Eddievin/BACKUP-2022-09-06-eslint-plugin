[ESLint plugin](index.md) / eslintrc/no-unnecessary-array

# eslintrc/no-unnecessary-array

Disallows unnessecary single-element arrays in eslint configuration files.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/eslintrc/no-unnecessary-array": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
module.exports = {
  overrides: [
    {
      files: ["./a"]
    }
  ]
};
```

## Examples of correct code

```ts
module.exports = {
  overrides: [
    {
      files: "./a"
    },
    {
      files: ["./a", "./b"]
    }
  ]
};
```
