[ESLint plugin](index.md) / statements-order

# statements-order

Requires consistent statements order.

## eslintrc.js

```ts
"@skylib/statements-order": [
  "error",
  {
    blockOrder?: Type[],
    moduleOrder?: Type[],
    order?: Type[],
    rootOrder?: Type[],
  }
]

type Type =
  | "ExportDeclaration"
  | "ExportDefaultDeclaration"
  | "ExportFunctionDeclaration"
  | "ExportTypeDeclaration"
  | "ExportUnknown"
  | "FunctionDeclaration"
  | "ImportDeclaration"
  | "ModuleDeclaration"
  | "TypeDeclaration"
  | "Unknown";
```

## Options

| Name | Description |
| :------ | :------ |
| `blockOrder` | Statements order. |
| `moduleOrder` | Statements order. |
| `order` | Statements order. |
| `rootOrder` | Statements order. |
