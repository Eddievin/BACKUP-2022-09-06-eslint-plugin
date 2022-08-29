[ESLint plugin](index.md) / class-only-export

# class-only-export

Requires class to be only export

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/class-only-export": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
export class SampleClass {}
export const x = 1;
```

## Examples of correct code

```ts
export class SampleClass {}
```
