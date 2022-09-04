[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / consistent-enum-members

# consistent-enum-members

Requires value to coincide with key inside enum.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/consistent-enum-members": "error"
  }
};
```

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