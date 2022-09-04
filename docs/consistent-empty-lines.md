[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / consistent-empty-lines

# consistent-empty-lines

Ensures consistent empty lines.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/consistent-empty-lines": [
      "error",
      {
        rules: [
          {
            _id: string,
            emptyLine: "always" | "any" | "never",
            next: string | string[],
            prev: string | string[],
            selector: string | string[]
          },
          ...
        ]
      }
    ]
  }
};
```

| Name | Description | Default value |
| :----- | :----- | :----- |
| rules.\<index\>._id | Id | - |
| rules.\<index\>.emptyLine | Requires or disallows empty line | - |
| rules.\<index\>.next | The second of the two adjustent AST selector (AST selector) | - |
| rules.\<index\>.prev | The first of the two adjustent AST elements (AST selector) | - |
| rules.\<index\>.selector | One selector for both adjustent AST elements (AST selector) | - |

## Examples of incorrect code

```ts
/*
eslint @skylib/consistent-empty-lines: [
  error,
  {
    rules: [
      {
        _id: "import",
        emptyLine: "always",
        selector: "ImportDeclaration"
      }
    ]
  }
]
*/
import x from "source1";
import y from "source2";
```

## Examples of correct code

```ts
/*
eslint @skylib/consistent-empty-lines: [
  error,
  {
    rules: [
      {
        _id: "import",
        emptyLine: "never",
        selector: "ImportDeclaration"
      }
    ]
  }
]
*/
import x from "source1";
import y from "source2";
```