[ESLint plugin](index.md) / jest/no-toThrow-literal

# jest/no-toThrow-literal

Disallows string argument in "toThrow" matcher.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/jest/no-toThrow-literal": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
expect(f).toThrow("Error message");
```

## Examples of correct code

```ts
expect(f).toThrow(new Error("Error message"));
```
