[ESLint plugin](index.md) / no-self-import

# no-self-import

Disallows import.

## eslintrc.js

```ts
"@skylib/no-self-import": [
  "error",
  {
    rules: [
      {
        allow?: string[],
        disallow?: string[]
      },
      ...
    ]
  }
]
```

## Options

| Name | Description |
| :------ | :------ |
| `allow` | Allowed sources (minimatch patterns). |
| `disallow` | Disallowed sources (minimatch patterns). |
