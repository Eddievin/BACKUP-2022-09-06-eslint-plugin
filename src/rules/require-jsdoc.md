# require-jsdoc

Requires JSDoc comments.

## eslintrc.js

```ts
"@skylib/require-jsdoc": [
  "error",
  {
    excludeSelectors?: string[],
    includeSelectors?: string[],
    interfaces?: Array<"callSignatures" | "constructSignatures" | "interface">,
    noDefaultSelectors?: string[],
    properties?: Array<"function" | "nonFunction">
  }
]
```

## Options

| Name | Description |
| :------ | :------ |
| `excludeSelectors` | Excludes AST selectors. |
| `includeSelectors` | Adds AST selectors. |
| `interfaces.callSignatures` | Require JSDoc comment for call signatures. |
| `interfaces.constructSignatures` | Require JSDoc comment for constructor signatures. |
| `interfaces.interface` | Require JSDoc comment for interface. |
| `noDefaultSelectors` | Do not use default AST selectors. |
| `properties.function` | Require JSDoc comment for function property. |
| `properties.nonFunction` | Require JSDoc comment for non-function property. |
