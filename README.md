# ESLint plugin

## Table of contents

- [Installation](#installation)
- Rules
  - [class-member-typedef](#class-member-typedef)
  - [consistent-empty-lines](#consistent-empty-lines)
  - [consistent-group-empty-lines](#consistent-group-empty-lines)
  - [consistent-import](#consistent-import)
  - [disallow-by-regexp](#disallow-by-regexp)
  - [disallow-identifier](#disallow-identifier)
  - [disallow-import](#disallow-import)
  - [empty-lines-around-comment](#empty-lines-around-comment)
  - [exhaustive-switch](#exhaustive-switch)
  - [no-inferrable-types](#no-inferrable-types)
  - [no-mutable-signature](#no-mutable-signature)
  - [no-unnecessary-readonly](#no-unnecessary-readonly)
  - [no-unnecessary-writable](#no-unnecessary-writable)
  - [no-unsafe-object-assignment](#no-unsafe-object-assignment)
  - [no-unused-import](#no-unused-import)
  - [object-format](#object-format)
  - [prefer-readonly](#prefer-readonly)
  - [require-jsdoc](#require-jsdoc)
  - [sort-class-members](#sort-class-members)
  - [sort-keys](#sort-keys)
  - [statements-order](#statements-order)
  - [switch-case-empty-lines](#switch-case-empty-lines)
  - [template-literal-format](#template-literal-format)
- [Shared options](#shared-options)

## <a name="installation"></a>Installation

```
npm install --save-dev @skylib/eslint-plugin
```

#### eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"]
};
```

## Rules

### <a name="class-member-typedef"></a>class-member-typedef

Requires type definition for class members without initializer.

#### eslintrc.js

```ts
"@skylib/class-member-typedef": "error"
```

### <a name="consistent-empty-lines"></a>consistent-empty-lines

Requires consistent empty lines.

#### eslintrc.js

```ts
"@skylib/consistent-empty-lines": [
  "error",
  {
    rules: [
      {
        emptyLine: "always" | "any" | "never",
        next: string,
        prev: string
      },
      ...
    ]
  }
]
```

#### Options

| Name | Description |
| :------ | :------ |
| `emptyLine` | Controls empty line between prev and next nodes. |
| `next` | AST selector. |
| `prev` | AST selector. |

### <a name="consistent-group-empty-lines"></a>consistent-group-empty-lines

Requires consistent empty lines.

#### eslintrc.js

```ts
"@skylib/consistent-group-empty-lines": [
  "error",
  {
    rules: [
      {
        averageLinesGte?: number,
        everyLinesGte?: number,
        selector: string,
        someHasDocComment?: boolean,
        someLinesGte?: number
      },
      ...
    ]
  }
]
```

#### Options

| Name | Description |
| :------ | :------ |
| `averageLinesGte` | Spread group if average lines >= given value. |
| `everyLinesGte` | Spread group if every lines >= given value. |
| `selector` | AST selector. |
| `someHasDocComment` | Spread group if some item has doc comment. |
| `someLinesGte` | Spread group if some lines >= given value. |

### <a name="consistent-import"></a>consistent-import

Requires consistent import. Auto-imports provided sources.

#### eslintrc.js

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

#### Options

| Name | Description |
| :------ | :------ |
| `altLocalNames` | Alternative local names to be used if _localName_ is occupied. |
| `autoImportSource` | Auto-import source (defaults to _sourcePattern_). |
| `localName` | Local name. |
| `sourcePattern` | Source (minimatch pattern). |
| `type` | Import type. |

### <a name="disallow-by-regexp"></a>disallow-by-regexp

Disallows code by regular expression.

#### eslintrc.js

```ts
"@skylib/disallow-by-regexp": [
  "error",
  {
    contexts?: Array<"code" | "comment" | "string">,
    rules: [
      {
        contexts?: Array<"code" | "comment" | "string">,
        patterns: string[],
        replacement?: string
      },
      ...
    ]
  }
]
```

#### Options

| Name | Description |
| :------ | :------ |
| `contexts` | Contexts (defaults to all contexts). |
| `patterns` | Patterns (regular expressions). |
| `replacement` | Replacement. |

### <a name="disallow-identifier"></a>disallow-identifier

Disallows identifiers.

#### eslintrc.js

```ts
"@skylib/disallow-identifier": [
  "error",
  {
    rules: [
      {
        ids: string[],
        replacement?: string
      },
      ...
    ]
  }
]
```

#### Options

| Name | Description |
| :------ | :------ |
| `ids` | Identifiers. |
| `replacement` | Replacement. |

### <a name="disallow-import"></a>disallow-import

Disallows import.

#### eslintrc.js

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

#### Options

| Name | Description |
| :------ | :------ |
| `allow` | Allowed sources (minimatch patterns). |
| `disallow` | Disallowed sources (minimatch patterns). |

### <a name="empty-lines-around-comment"></a>empty-lines-around-comment

Requires consistent empty lines around comments.

#### eslintrc.js

```ts
"@skylib/empty-lines-around-comment": "error"
```

### <a name="exhaustive-switch"></a>exhaustive-switch

Requires exhaustive switch (replaces "@typescript-eslint/switch-exhaustiveness-check" rule, correctly treats _typeof_ operator).

#### eslintrc.js

```ts
"@skylib/exhaustive-switch": "error"
```

### <a name="no-inferrable-types"></a>no-inferrable-types

Forbids inferrable types (complements "@typescript-eslint/no-inferrable-types" rule).

#### eslintrc.js

```ts
"@skylib/no-inferrable-types": "error"
```

### <a name="no-mutable-signature"></a>no-mutable-signature

Forbids mutable signatures.

#### eslintrc.js

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

#### Options

| Name | Description |
| :------ | :------ |
| `ignoreClasses` | Ignores classes. |
| `ignoreIdentifiers` | Ignore identifiers (regular expressions). |
| `ignoreInferredTypes` | Ignore ignore inferred types. |
| `ignoreInterfaces` | Ignore interfaces. |
| `ignoreNumberSignature` | Ignore number signature. |
| `ignoreStringSignature` | Ignore string signature. |
| `ignoreTypes` | Ignore types (regular expressions). |

### <a name="no-unnecessary-readonly"></a>no-unnecessary-readonly

Forbids unnecessary Readonly|DeepReadonly wrapper.

#### eslintrc.js

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

#### Options

| Name | Description |
| :------ | :------ |
| `ignoreClasses` | Ignores classes. |
| `ignoreInterfaces` | Ignore interfaces. |
| `ignoreTypes` | Ignores types (regular expressions). |

### <a name="no-unnecessary-writable"></a>no-unnecessary-writable

Forbids unnecessary Writable|DeepWritable wrapper.

#### eslintrc.js

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

#### Options

| Name | Description |
| :------ | :------ |
| `ignoreClasses` | Ignores classes. |
| `ignoreInterfaces` | Ignore interfaces. |
| `ignoreTypes` | Ignores types (regular expressions). |

### <a name="no-unsafe-object-assignment"></a>no-unsafe-object-assignment

Forbids:
- Readonly-to-mutable assignments.
- Optional assignments.

#### eslintrc.js

```ts
"@skylib/no-unsafe-object-assignment": "error"
```

### <a name="no-unused-import"></a>no-unused-import

Removes unused import.

#### eslintrc.js

```ts
"@skylib/no-unused-import": "error"
```

### <a name="object-format"></a>object-format

Enforces consistent use of mutliline or single-line object literals.

#### eslintrc.js

```ts
"@skylib/object-format": "error"
```

### <a name="prefer-readonly"></a>prefer-readonly

Enforces the use of readonly properties.

#### eslintrc.js

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

#### Options

| Name | Description |
| :------ | :------ |
| `excludeSelectors` | Exclude AST selectors. |
| `ignoreClasses` | Ignore classes. |
| `ignoreIdentifiers` | Ignore identifiers (regular expressions). |
| `ignoreInterfaces` | Ignore interfaces. |
| `ignoreTypes` | Ignore types (regular expressions). |
| `includeSelectors` | Add AST selectors. |
| `noDefaultSelectors` | Do not use default AST selectors. |

### <a name="require-jsdoc"></a>require-jsdoc

Requires JSDoc comments.

#### eslintrc.js

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

#### Options

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

### <a name="sort-class-members"></a>sort-class-members

Sorts class members.

#### eslintrc.js

```ts
"@skylib/sort-class-members": [
  "error",
  {
    sortingOrder: string[]
  }
]
```

### <a name="sort-keys"></a>sort-keys

Sorts object properties.

#### eslintrc.js

```ts
"@skylib/sort-keys": "error"
```

#### Configuration comment

```ts
// @skylib/sort-keys break
```

### <a name="statements-order"></a>statements-order

Requires consistent statements order.

#### eslintrc.js

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

#### Options

| Name | Description |
| :------ | :------ |
| `blockOrder` | Statements order. |
| `moduleOrder` | Statements order. |
| `order` | Statements order. |
| `rootOrder` | Statements order. |

### <a name="switch-case-empty-lines"></a>switch-case-empty-lines

Requires consistent empty lines between switch cases.

#### eslintrc.js

```ts
"@skylib/switch-case-empty-lines": "error"
```

### <a name="template-literal-format"></a>template-literal-format

Checks template literal format.

#### eslintrc.js

```ts
"@skylib/template-literal-format": "error"
```

## <a name="shared-options"></a>Shared options

#### eslintrc.js

```ts
"@skylib/<rule-id>": [
  "error",
  {
    filesToLint?: string[],
    filesToSkip?: string[],
    <sub-options-key>: [
      {
        filesToLint?: string[],
        filesToSkip?: string[],
        subOptionsId?: string
      },
      ...
    ]
  }
]
```

#### Options

| Name | Description |
| :------ | :------ |
| `filesToLint` | Files to lint (minimatch patterns). |
| `filesToSkip` | Files to skip (minimatch patterns). |
| `subOptionsId` | Suboptions ID. |

#### Configuration comment

```ts
/* skylib/eslint-plugin disable @skylib/<rule-id>[<sub-options-id>] */
```
