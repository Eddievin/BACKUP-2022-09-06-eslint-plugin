[ESLint plugin](index.md) / no-unnecessary-readonly

# no-unnecessary-readonly

Forbids unnecessary Readonly|DeepReadonly wrapper.

## eslintrc.js

```ts
"@skylib/no-unnecessary-readonly": [
  "error",
  {
    ignoreClasses?: boolean,
    ignoreInterfaces?: boolean,
    ignoreTypes?: string[]
  }
]
```

## Options

| Name | Description |
| :------ | :------ |
| `ignoreClasses` | Ignores classes. |
| `ignoreInterfaces` | Ignore interfaces. |
| `ignoreTypes` | Ignores types (regular expressions). |
