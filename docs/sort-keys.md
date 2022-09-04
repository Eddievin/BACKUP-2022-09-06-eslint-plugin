[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / sort-keys

# sort-keys

Sorts object keys.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/sort-keys": [
      "error",
      {
        overrides: [
          {
            _id: string,
            customOrder: string[],
            selector: string | string[],
            sendToBottom: string,
            sendToTop: string
          },
          ...
        ]
      }
    ]
  }
};
```

| Name | Description | Default value |
| :----- | :----- | :----- |
| overrides.\<index\>._id | Id | - |
| overrides.\<index\>.customOrder | Array elements with custom order | - |
| overrides.\<index\>.selector | AST elements to be sorted (AST selector) | - |
| overrides.\<index\>.sendToBottom | Array elements that should be sent to bottom | - |
| overrides.\<index\>.sendToTop | Array elements that should be sent to top | - |

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