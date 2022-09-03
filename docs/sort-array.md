[ESLint plugin](index.md) / sort-array

# sort-array

Sorts arrays.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/sort-array": [
      "error",
      {
        customOrder: string[],
        selector: string | string[],
        sendToBottom: string,
        sendToTop: string,
        sortKey: string,
        triggerByComment: boolean
      }
    ]
  }
};
```

| Name | Description | Default value |
| :----- | :----- | :----- |
| customOrder | Array elements with custom order |
| selector | AST elements to be sorted (AST selector) |
| sendToBottom | Array elements that should be sent to bottom |
| sendToTop | Array elements that should be sent to top |
| sortKey | Determines which object key should be used to compare objects |
| triggerByComment | Triggers sorting by "// @sorted" comment |

## Examples of incorrect code

```ts
// @sorted
const x = [2, 1];
```

## Examples of correct code

```ts
const x = [2, 1];
// @sorted
const y = [1, 2];
```