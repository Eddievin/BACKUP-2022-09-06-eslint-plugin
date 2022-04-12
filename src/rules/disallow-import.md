# disallow-import

Disallows import.

## eslintrc.js

```ts
"@skylib/disallow-import": [
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
