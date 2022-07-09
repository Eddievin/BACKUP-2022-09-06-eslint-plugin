# ESLint plugin

## Table of contents

- [Installation](#installation)
- [Rules](#rules)
- [Shared options](https://ilyub.github.io/eslint-plugin/shared-options.html)

## <a name="installation"></a>Installation

```
npm install --save-dev @skylib/eslint-plugin
```

## <a name="shared-options"></a>Shared options

### eslintrc.js

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
        _id?: string
      },
      ...
    ]
  }
]
```

### Options

| Name | Description |
| :------ | :------ |
| `filesToLint` | Files to lint (minimatch patterns). |
| `filesToSkip` | Files to skip (minimatch patterns). |
| `_id` | Suboptions ID. |

## <a name="rules"></a>Rules

- [class-member-typedef](https://ilyub.github.io/eslint-plugin/class-member-typedef.html)
- [consistent-empty-lines](https://ilyub.github.io/eslint-plugin/consistent-empty-lines.html)
- [consistent-group-empty-lines](https://ilyub.github.io/eslint-plugin/consistent-group-empty-lines.html)
- [consistent-import](https://ilyub.github.io/eslint-plugin/consistent-import.html)
- [disallow-import](https://ilyub.github.io/eslint-plugin/disallow-import.html)
- [empty-lines-around-comment](https://ilyub.github.io/eslint-plugin/empty-lines-around-comment.html)
- [exhaustive-switch](https://ilyub.github.io/eslint-plugin/exhaustive-switch.html)
- [no-inferrable-types](https://ilyub.github.io/eslint-plugin/no-inferrable-types.html)
- [no-mutable-signature](https://ilyub.github.io/eslint-plugin/no-mutable-signature.html)
- [custom](https://ilyub.github.io/eslint-plugin/custom.html)
- [no-self-import](https://ilyub.github.io/eslint-plugin/no-self-import.html)
- [no-unnecessary-readonly](https://ilyub.github.io/eslint-plugin/no-unnecessary-readonly.html)
- [no-unnecessary-writable](https://ilyub.github.io/eslint-plugin/no-unnecessary-writable.html)
- [no-unsafe-object-assignment](https://ilyub.github.io/eslint-plugin/no-unsafe-object-assignment.html)
- [no-unused-import](https://ilyub.github.io/eslint-plugin/no-unused-import.html)
- [object-format](https://ilyub.github.io/eslint-plugin/object-format.html)
- [prefer-readonly](https://ilyub.github.io/eslint-plugin/prefer-readonly.html)
- [prefer-ts-toolbelt](https://ilyub.github.io/eslint-plugin/prefer-ts-toolbelt.html)
- [require-jsdoc](https://ilyub.github.io/eslint-plugin/require-jsdoc.html)
- [sort-array](https://ilyub.github.io/eslint-plugin/sort-array.html)
- [sort-class-members](https://ilyub.github.io/eslint-plugin/sort-class-members.html)
- [sort-keys](https://ilyub.github.io/eslint-plugin/sort-keys.html)
- [statements-order](https://ilyub.github.io/eslint-plugin/statements-order.html)
- [switch-case-empty-lines](https://ilyub.github.io/eslint-plugin/switch-case-empty-lines.html)
- [template-literal-format](https://ilyub.github.io/eslint-plugin/template-literal-format.html)
