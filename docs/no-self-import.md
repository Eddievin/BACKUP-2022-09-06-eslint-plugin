[ESLint plugin](index.md) / no-self-import

# no-self-import

Disallows self-import.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/no-self-import": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
// filename: file.ts
import { a } from "./file";
import { b } from "./file.ts";
```

## Examples of correct code

```ts
// filename: file.ts
import { a } from "@/file";
import { b } from "@/file.ts";
```
