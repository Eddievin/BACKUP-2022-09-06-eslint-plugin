[ESLint plugin](index.md) / eslintrc/sort-array

# eslintrc/sort-array

Sorts safely sortable arrays in eslint configuration files.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/eslintrc/sort-array": "error"
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
      files: ["./b", "./a"]
    }
  ]
};
```

## Examples of correct code

```ts
module.exports = {
  overrides: [
    {
      files: ["./a", "./b"]
    }
  ]
};
```
