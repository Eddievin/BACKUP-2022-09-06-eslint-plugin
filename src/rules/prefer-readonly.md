# prefer-readonly

Enforces the use of readonly properties.

## eslintrc.js

```ts
"@skylib/prefer-readonly": [
  "error",
  {
    excludeSelectors?: string[],
    ignoreClasses?: boolean,
    ignoreIdentifiers?: string[],
    ignoreInterfaces?: boolean,
    ignoreTypes?: string[],
    includeSelectors?: string[],
    noDefaultSelectors?: boolean
  }
]
```

## Options

| Name | Description |
| :------ | :------ |
| `excludeSelectors` | Exclude AST selectors. |
| `ignoreClasses` | Ignore classes. |
| `ignoreIdentifiers` | Ignore identifiers (regular expressions). |
| `ignoreInterfaces` | Ignore interfaces. |
| `ignoreTypes` | Ignore types (regular expressions). |
| `includeSelectors` | Add AST selectors. |
| `noDefaultSelectors` | Do not use default AST selectors. |
