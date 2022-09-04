[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / eslintrc/consistent-suboptions-id

# eslintrc/consistent-suboptions-id

Requires consistent IDs.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/eslintrc/consistent-suboptions-id": "error"
  }
};
```

## Examples of incorrect code

```ts
module.exports = {
  rules: {
    "@skylib/sort-keys": [
      "warn",
      {
        overrides: [{ _id: "a-b" }]
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
        overrides: [{ _id: "a.b" }]
      }
    ]
  }
};
```