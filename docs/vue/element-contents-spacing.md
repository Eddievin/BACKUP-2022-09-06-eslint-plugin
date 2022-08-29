[ESLint plugin](index.md) / vue/element-contents-spacing

# vue/element-contents-spacing

Controls spaces around HTML element contents.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/vue/element-contents-spacing": "error"
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
  <p> single-line contents </p>
</template>
```

## Examples of correct code

```ts
<template>
  <p>single-line contents</p>
  <p>
    multiline contents
    multiline contents
  </p>
</template>
```
