[ESLint plugin](index.md) / typescript/no-this-void

# typescript/no-this-void

Disallows "this: void" syntax.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/typescript/no-this-void": "error"
  }
};
```

## Examples of incorrect code

```ts
class C {
  f(this: void) {}
}
```

## Examples of correct code

```ts
class C {
  f: () => {}
}
```