# disallow-identifier

Disallows identifiers.

## eslintrc.js

```ts
"@skylib/disallow-identifier": [
  "error",
  {
    rules: [
      {
        ids: string[],
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
| `ids` | Identifiers. |
| `replacement` | Replacement. |
