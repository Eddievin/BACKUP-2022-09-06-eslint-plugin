[ESLint plugin](index.md) / no-unnecessary-break

# no-unnecessary-break

Disallows unnecessary "break".

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/no-unnecessary-break": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
switch (x) {
  case 1:
    break;

  case 2:
    break;
}
```

## Examples of correct code

```ts
switch (x) {
  case 1:
    break;

  case 2:
}
```
