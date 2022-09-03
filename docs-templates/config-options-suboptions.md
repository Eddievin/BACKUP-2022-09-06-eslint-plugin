```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/{{name}}": [
      "error",
      {
        {{options}},
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
{{options-annotation}}
{{suboptions-annotation}}
