[ESLint plugin](index.md) / consistent-optional-props

# consistent-optional-props

Ensures consistent optional property style:
- x?: T | undefined
- x?: T
- x: T | undefined

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/consistent-optional-props": [
      "error",
      {
        classes: "combined" | "optional" | "undefined",
        interfaces: "combined" | "optional" | "undefined",
        overrides: [
          {
            _id: string,
            pattern: string | string[],
            propertyPattern: string | string[],
            style: "combined" | "optional" | "undefined",
            target: "classes" | "interfaces"
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
| classes | Prefered style for classes |
| interfaces | Prefered style for interfaces |
| rules._id | Id |
| rules.pattern | Only for selected class/interface names (regular expression) |
| rules.propertyPattern | Only for selected property names (regular expression) |
| rules.style | Prefered style |
| rules.target | Classes or interfaces |

## Examples of incorrect code

```ts
interface I {
  x?: string;
  y: string | undefined;
}
```

## Examples of correct code

```ts
interface I {
  x?: string | undefined;
  y?: string | undefined;
}
```