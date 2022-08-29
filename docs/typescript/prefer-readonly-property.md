[ESLint plugin](index.md) / typescript/prefer-readonly-property

# typescript/prefer-readonly-property

Disallows writable properties.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/typescript/prefer-readonly-property": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


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
