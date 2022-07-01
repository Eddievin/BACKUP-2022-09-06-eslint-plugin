# optional-property-style

Enforces unified style for optional properties.

## eslintrc.js

```ts
"@skylib/optional-property-style": [
  "error",
  {
    classes: "combined" | "optional" | "undefined",
    interfaces: "combined" | "optional" | "undefined"
  }
]
```

## Options

| Name | Description |
| :------ | :------ |
| `classes` | Optional property's style for classes. |
| `interfaces` | Optional property's style for interfaces. |
