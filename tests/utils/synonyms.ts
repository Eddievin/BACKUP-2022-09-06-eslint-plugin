import { utils } from "@";

test.each([
  {
    core: { aaa: "ccc" },
    expected: { "aaa/bbb": "ccc" },
    path: "./fixtures/synonyms.js"
  },
  { core: {}, expected: {}, path: "./fixtures/synonyms.missing.js" }
])("getSynonyms", ({ core, expected, path }) => {
  expect(utils.getSynonyms(path, core)).toStrictEqual(expected);
});
