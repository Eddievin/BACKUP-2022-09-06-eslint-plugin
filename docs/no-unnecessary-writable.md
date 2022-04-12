[ESLint plugin](index.md) / no-unnecessary-writable

# no-unnecessary-writable

Forbids unnecessary Writable|DeepWritable wrapper.

## eslintrc.js

```ts
"@skylib/no-unnecessary-writable": [
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
