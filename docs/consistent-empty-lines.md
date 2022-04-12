[ESLint plugin](index.md) / consistent-empty-lines

# consistent-empty-lines

Requires consistent empty lines.

## eslintrc.js

```ts
"@skylib/consistent-empty-lines": [
  "error",
  {
    rules: [
      {
        emptyLine: "always" | "any" | "never",
        next: string,
        prev: string
      },
      ...
    ]
  }
]
```

## Options

| Name | Description |
| :------ | :------ |
| `emptyLine` | Controls empty line between prev and next nodes. |
| `next` | AST selector. |
| `prev` | AST selector. |
