[ESLint plugin](index.md) / vue/no-empty-lines

# vue/no-empty-lines

Disallow empty lines inside <template> section.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/vue/no-empty-lines": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
<template>
  <p></p>

  <p></p>
</template>
```

## Examples of correct code

```ts
<template>
  <p></p>
  text

  text
  <p></p>
</template>
```
