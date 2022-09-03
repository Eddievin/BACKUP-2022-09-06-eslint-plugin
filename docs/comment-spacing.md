[ESLint plugin](index.md) / comment-spacing

# comment-spacing

Ensures consistent empty lines around comments.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/comment-spacing": "error"
  }
};
```

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