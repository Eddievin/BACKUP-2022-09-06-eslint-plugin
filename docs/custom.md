[ESLint plugin](index.md) / custom

# custom

Disallows code by selectors.

## eslintrc.js

```ts
"@skylib/custom": [
  "error",
  {
    rules: [
      {
        message?: string,
        search?: string,
        selector: string | string[],
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

| `message` | Message. |
| `search` | Search (regular expression). |
| `selector` | Selector. |
| `replacement` | Replacement. |
