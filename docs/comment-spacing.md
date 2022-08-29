[ESLint plugin](index.md) / comment-spacing

# comment-spacing

Ensures consistent empty lines around comments.

## eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/comment-spacing": "error"
  }
};
```

## Options

| Name | Description |
| :------ | :------ |
| `Parameter name` | Parameter description. |


## Examples of incorrect code

```ts
// Comment
function f() {}

/** Comment */
function g() {}

/*
Comment
*/

function h() {}
```

## Examples of correct code

```ts
// Comment

function f() {}

/** Comment */

function g() {}

/*
Comment
*/
function h() {}
```
