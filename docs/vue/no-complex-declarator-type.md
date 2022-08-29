[ESLint plugin](index.md) / vue/no-complex-declarator-type

# vue/no-complex-declarator-type

Disallow complex declarator types.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/vue/no-complex-declarator-type": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
const x = { value: 1 };
```

## Examples of correct code

```ts
const x = { value: 1 } as const;

const y: object = { value: 1 };

export default defineComponent({
  setup: () => ({ x: 1 })
});
```
