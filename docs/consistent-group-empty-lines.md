[ESLint plugin](index.md) / consistent-group-empty-lines

# consistent-group-empty-lines

Requires consistent empty lines.

## eslintrc.js

```ts
"@skylib/consistent-group-empty-lines": [
  "error",
  {
    rules: [
      {
        averageLinesGte?: number,
        everyLinesGte?: number,
        selector: string,
        someHasDocComment?: boolean,
        someLinesGte?: number
      },
      ...
    ]
  }
]
```

## Options

| Name | Description |
| :------ | :------ |
| `averageLinesGte` | Spread group if average lines >= given value. |
| `everyLinesGte` | Spread group if every lines >= given value. |
| `selector` | AST selector. |
| `someHasDocComment` | Spread group if some item has doc comment. |
| `someLinesGte` | Spread group if some lines >= given value. |
