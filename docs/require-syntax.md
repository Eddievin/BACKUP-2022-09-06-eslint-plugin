[ESLint plugin](index.md) / require-syntax

# require-syntax

Requires script to contain syntax.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/require-syntax": [
      "error",
      {
        message: string,
        once: boolean,
        selector: string | string[],
        trigger: string | string[]
      }
    ]
  }
};
```

| Name | Description | Default value |
| :----- | :----- | :----- |
| message | Custom message |
| once | Syntax should be found exactly one time |
| selector | AST selector |
| trigger | Trigger rule by AST selector |

## Examples of incorrect code

```ts
/*
eslint @skylib/require-syntax: [
  error,
  {
    selector: "Identifier[name=x]",
    trigger: "Identifier[name=y]"
  }
]
*/
export const y = 1;
```

## Examples of correct code

```ts
/*
eslint @skylib/require-syntax: [
  error,
  {
    selector: "Identifier[name=x]",
    trigger: "Identifier[name=y]"
  }
]
*/
export const x = 1;
export const y = 1;
```