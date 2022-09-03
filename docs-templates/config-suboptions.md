```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/{{name}}": [
      "error",
      {
        {{key}}: [
          {
            {{suboptions}}
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
{{suboptions-annotation}}
