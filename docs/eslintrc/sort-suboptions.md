[ESLint plugin](index.md) / eslintrc/sort-suboptions

# eslintrc/sort-suboptions

Sorts safely sortable arrays in eslint configuration files.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/eslintrc/sort-suboptions": "error"
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
  rules: {
    "@skylib/sort-keys": [
      "warn",
      {
        overrides: [{ _id: "b" }, { _id: "a" }]
      }
    ]
  }
};
```

## Examples of correct code

```ts
module.exports = {
  rules: {
    "@skylib/sort-keys": [
      "warn",
      {
        overrides: [{ _id: "a" }, { _id: "b" }]
      }
    ]
  }
};
```
