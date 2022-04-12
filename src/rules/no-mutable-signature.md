# no-mutable-signature

Forbids mutable signatures.

## eslintrc.js

```ts
"@skylib/no-mutable-signature": [
  "error",
  {
    ignoreClasses?: boolean,
    ignoreIdentifiers?: string[],
    ignoreInferredTypes?: boolean,
    ignoreInterfaces?: boolean,
    ignoreNumberSignature?: boolean,
    ignoreStringSignature?: boolean,
    ignoreTypes?: string[]
  }
]
```

## Options

| Name | Description |
| :------ | :------ |
| `ignoreClasses` | Ignores classes. |
| `ignoreIdentifiers` | Ignore identifiers (regular expressions). |
| `ignoreInferredTypes` | Ignore ignore inferred types. |
| `ignoreInterfaces` | Ignore interfaces. |
| `ignoreNumberSignature` | Ignore number signature. |
| `ignoreStringSignature` | Ignore string signature. |
| `ignoreTypes` | Ignore types (regular expressions). |
