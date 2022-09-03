```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/{{name}}": [
      "error",
      {
        {{options}}
      }
    ]
  }
};
```

| Name | Description | Default value |
| :----- | :----- | :----- |
{{options-annotation}}
