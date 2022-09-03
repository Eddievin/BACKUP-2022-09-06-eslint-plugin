[ESLint plugin](index.md) / require-jsdoc

# require-jsdoc

Requires JSDoc documentation.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/require-jsdoc": [
      "error",
      {
        excludeSelectors: string[],
        includeSelectors: string[],
        interfaces: "callSignatures" | "constructSignatures" | "interface",
        noDefaultSelectors: boolean,
        properties: Array<"function" | "nonFunction">
      }
    ]
  }
};
```

| Name | Description | Default value |
| :----- | :----- | :----- |
| excludeSelectors | Skip these selectors. |
| includeSelectors | Check additional selectors. |
| interfaces | Require documenation for interface ("interface"), call signatures ("callSignatures"), construct signatures ("constructSignatures") |
| noDefaultSelectors | Do not check default selectors |
| properties | Require documenation for function properties ("function"), non-function properties ("nonFunction") |

## Examples of incorrect code

```ts
function f(): void {}
```

## Examples of correct code

```ts
/**
 * Description.
 */
function f(): void {}
```