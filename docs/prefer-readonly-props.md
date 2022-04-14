[ESLint plugin](index.md) / prefer-readonly-props

# prefer-readonly-props

Enforces readonly properties.

## eslintrc.js

```ts
"@skylib/prefer-readonly": [
  "error",
  {
    ignoreClasses: boolean,
    ignoreIdentifiers:  string[],
    ignoreInterfaces: boolean,
    ignorePrivateProperties: boolean,
    ignoreProtectedProperties: boolean,
    ignorePublicProperties: boolean,
    ignoreSelectedClasses:  string[],
    ignoreSelectedInterfaces:  string[]
  }
]
```

## Options

| Name | Description |
| :------ | :------ |
| `ignoreClasses` | Ignore classes. |
| `ignoreIdentifiers` | Ignore identifiers (regular expressions). |
| `ignoreInterfaces` | Ignore interfaces. |
| `ignorePrivateProperties` | Ignore private properties. |
| `ignoreProtectedProperties` | Ignore protected properties. |
| `ignorePublicProperties` | Ignore public properties. |
| `ignoreSelectedClasses` | Ignore selected classes (regular expressions). |
| `ignoreSelectedInterfaces` | Ignore selected interfaces (regular expressions). |
