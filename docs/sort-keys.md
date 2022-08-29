[ESLint plugin](index.md) / sort-keys

# sort-keys

Sorts object keys.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/sort-keys": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
export default {
  b: 1,
  a: 2
}
```

## Examples of correct code

```ts
export default {
  a: 1,
  b: 2
}
```
