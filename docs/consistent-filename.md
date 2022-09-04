[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / consistent-filename

# consistent-filename

Ensures consistent file name.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/consistent-filename": [
      "error",
      {
        format: "PascalCase" | "camelCase" | "kebab-case",
        overrides: [
          {
            _id: string,
            format: "PascalCase" | "camelCase" | "kebab-case",
            match: boolean,
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
| format | File name format |
| rules._id | Id |
| rules.format | File name format |
| rules.match | File name should match AST element |
| rules.selector | AST selector |

## Examples of incorrect code

```ts
// filename: SampleClass.ts
/*
eslint @skylib/consistent-filename: [
  error,
  {
    overrides: [
      {
        _id: "class",
        format: "kebab-case",

        match: true,
        selector: "ClassDeclaration > Identifier.id"
      }
    ]
  }
]
*/
class SampleClass {}
```

## Examples of correct code

```ts
// filename: SampleClass.ts
/*
eslint @skylib/consistent-filename: [
  error,
  {
    overrides: [
      {
        _id: "class",
        format: "PascalCase",
        match: true,
        selector: "ClassDeclaration > Identifier.id"
      }
    ]
  }
]
*/
class SampleClass {}
```