[ESLint plugin](index.md) / no-unnecessary-initialization

# no-unnecessary-initialization

Disallows unnecessary initialization.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/no-unnecessary-initialization": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
const x = undefined;

class C {
  x = undefined;
}
```

## Examples of correct code

```ts
const x = 1;

class C {
  x = 1;
}
```
