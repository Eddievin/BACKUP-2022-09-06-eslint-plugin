[ESLint plugin](index.md) / vue/component-name

# vue/component-name

Requires using enums instead of string literals.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/vue/component-name": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
<!-- filename: SampleComponent.vue -->
<script lang="ts">
  export default defineComponent({ name: "invalid-name" });
</script>
```

## Examples of correct code

```ts
<!-- filename: SampleComponent.vue -->
<script lang="ts">
  export default defineComponent({ name: "sample-component" });
</script>
```
