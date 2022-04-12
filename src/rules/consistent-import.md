# consistent-import

Requires consistent import. Auto-imports provided sources.

## eslintrc.js

```ts
"@skylib/consistent-import": [
  "error",
  {
    sources: [
      {
        altLocalNames?: string[],
        autoImportSource?: string,
        localName?: string,
        sourcePattern: string,
        type: "default" | "wildcard"
      },
      ...
    ]
  }
]
```

## Options

| Name | Description |
| :------ | :------ |
| `altLocalNames` | Alternative local names to be used if _localName_ is occupied. |
| `autoImportSource` | Auto-import source (defaults to _sourcePattern_). |
| `localName` | Local name. |
| `sourcePattern` | Source (minimatch pattern). |
| `type` | Import type. |
