[ESLint plugin](index.md) / typescript/no-inferrable-types

# typescript/no-inferrable-types

Reports inferrable types.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/typescript/no-inferrable-types": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
function f<T>() {
  const x: T = {} as T;
}
```

## Examples of correct code

```ts
function f<T>() {
  const x = {} as T;
}
```
