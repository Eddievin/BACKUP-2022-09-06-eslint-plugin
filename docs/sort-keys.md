[ESLint plugin](index.md) / sort-keys

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
| rules._id | Id |
| rules.customOrder | Array elements with custom order |
| rules.selector | AST elements to be sorted (AST selector) |
| rules.sendToBottom | Array elements that should be sent to bottom |
| rules.sendToTop | Array elements that should be sent to top |

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