[ESLint plugin](index.md) / eslintrc/no-message-dot

# eslintrc/no-message-dot

Disallows dot at the end of message.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/eslintrc/no-message-dot": "error"
  }
};
```

## Examples of incorrect code

```ts
module.exports = {
  rules: {
    "@skylib/require-syntax": [
      "warn",
      {
        message: "Error message."
      }
    ]
  }
};
```

## Examples of correct code

```ts
module.exports = {
  rules: {
    "@skylib/require-syntax": [
      "warn",
      {
        message: "Error message"
      }
    ]
  }
};
```