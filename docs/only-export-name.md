[ESLint plugin](index.md) / only-export-name

# only-export-name

Ensures that only export matches filename.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/only-export-name": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
// filename: file.ts
export class SampleClass {}
```

## Examples of correct code

```ts
// filename: SampleClass.ts
export class SampleClass {}
```
