// eslint-disable-next-line @skylib/no-internal-modules -- Ok
const dist = require("./dist/rules.core.js");

const fs = require("node:fs");

const functions = require("@skylib/functions");

// eslint-disable-next-line @skylib/disallow-import/natural-compare -- Ok
const naturalCompare = require("natural-compare");

const { a, o, s } = functions;

const indexTemplate = fs.readFileSync("./docs-templates/index.md").toString();

const ruleTemplate = fs.readFileSync("./docs-templates/rule.md").toString();

const rules = o.filter(
  dist.rules,
  (_rule, name) =>
    !(
      name.startsWith("config/") ||
      name.startsWith("facades/") ||
      name.startsWith("framework/") ||
      name.startsWith("functions/") ||
      name.startsWith("quasar-extension/")
    )
);

{
  const index = indexTemplate.replace(
    "{{rules}}",
    a
      .sort(o.keys(rules), (x, y) => {
        if (x.includes("/") && !y.includes("/")) return 1;

        if (y.includes("/") && !x.includes("/")) return -1;

        return naturalCompare(x, y);
      })
      .map(
        name =>
          `- [${name}](https://ilyub.github.io/eslint-plugin/${name}.html)`
      )
      .join("\n")
  );

  fs.writeFileSync("./README.md", index);
  fs.writeFileSync("./docs/index.md", index);
}

{
  fs.mkdirSync("./docs/eslintrc");
  fs.mkdirSync("./docs/jest");
  fs.mkdirSync("./docs/typescript");
  fs.mkdirSync("./docs/vue");

  for (const [name, rule] of o.entries(rules))
    fs.writeFileSync(
      `./docs/${name}.md`,
      // eslint-disable-next-line no-warning-comments -- Wait for @skylib/functions update
      // fixme: Use strtr
      s.replaceAll(
        ruleTemplate
          .replace("{{description}}", rule.meta.docs.description)
          .replace("{{fail}}", rule.meta.docs.failExamples)
          .replace("{{pass}}", rule.meta.docs.passExamples),
        "{{name}}",
        name
      )
    );
}
