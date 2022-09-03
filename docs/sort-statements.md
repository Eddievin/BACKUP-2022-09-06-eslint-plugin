[ESLint plugin](index.md) / sort-statements

# sort-statements

Sorts statements.

```ts
StatementType =
  | "DeclareGlobal"
  | "ExportAllDeclaration"
  | "ExportDeclaration"
  | "ExportDefaultDeclaration"
  | "ExportFunctionDeclaration"
  | "ExportTypeDeclaration"
  | "ExportUnknown"
  | "FunctionDeclaration"
  | "ImportDeclaration"
  | "JestTest"
  | "TypeDeclaration"
  | "Unknown";
```

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/sort-statements": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
function f() {}
type T1 = number;
const x1 = true;
const x2 = true;
export function g() {}
export type T2 = number;
export const x3 = true;
export const x4 = true;
export * from "source";
declare global {}
import "source";
```

## Examples of correct code

```ts
import "source";
declare global {}
export * from "source";
export const x1 = true;
export const x2 = true;
export type T1 = number;
export function f() {}
const x3 = true;
const x4 = true;
type T2 = number;
function g() {}
```