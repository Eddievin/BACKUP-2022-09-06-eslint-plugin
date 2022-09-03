[ESLint plugin](index.md) / typescript/prefer-readonly-property

# typescript/prefer-readonly-property

Disallows writable properties.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/typescript/prefer-readonly-property": "error"
  }
};
```

## Examples of incorrect code

```ts
class C {
  x: string;
}
```

## Examples of correct code

```ts
class C {
  readonly x: string;
}
```