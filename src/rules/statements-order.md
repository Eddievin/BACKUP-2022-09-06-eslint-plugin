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

type NodeType =
  | "ExportDeclaration"
  | "ExportDefaultDeclaration"
  | "ExportFunctionDeclaration"
  | "ExportModuleDeclaration"
  | "ExportTypeDeclaration"
  | "ExportUnknown"
  | "FunctionDeclaration"
  | "GlobalModuleDeclaration"
  | "ImportDeclaration"
  | "JestTest"
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
