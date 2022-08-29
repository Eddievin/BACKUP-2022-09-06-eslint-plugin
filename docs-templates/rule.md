[ESLint plugin](index.md) / {{name}}

# {{name}}

{{description}}

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/{{name}}": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
{{fail}}
```

## Examples of correct code

```ts
{{pass}}
```
