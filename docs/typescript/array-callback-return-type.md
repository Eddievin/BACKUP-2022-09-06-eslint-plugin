[ESLint plugin](index.md) / typescript/array-callback-return-type

# typescript/array-callback-return-type

Requires boolean return type in array callbacks.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/typescript/array-callback-return-type": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
[1, true].every(x => x);
```

## Examples of correct code

```ts
[1].every(x => x);
[""].every(x => x);
[false].every(x => x);
```
