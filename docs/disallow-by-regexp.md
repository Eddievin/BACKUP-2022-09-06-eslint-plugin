[ESLint plugin](index.md) / disallow-by-regexp

# disallow-by-regexp

Disallows code by regular expression.

## eslintrc.js

```ts
"@skylib/disallow-by-regexp": [
  "error",
  {
    contexts?: Array<"code" | "comment" | "string">,
    rules: [
      {
        contexts?: Array<"code" | "comment" | "string">,
        patterns: string[],
        replacement?: string
      },
      ...
    ]
  }
]
```

## Options

| Name | Description |
| :------ | :------ |
| `contexts` | Contexts (defaults to all contexts). |
| `patterns` | Patterns (regular expressions). |
| `replacement` | Replacement. |
