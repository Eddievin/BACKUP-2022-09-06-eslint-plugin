[ESLint plugin](index.md) / vue/no-complex-return-type

# vue/no-complex-return-type

Disallow complex function return types.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/vue/no-complex-return-type": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
function f() {
  return { x: 1 };
}
```

## Examples of correct code

```ts
function f(): object {
  return { x: 1 };
}

export default defineComponent({
  setup: () => ({ x: 1 })
});
```
