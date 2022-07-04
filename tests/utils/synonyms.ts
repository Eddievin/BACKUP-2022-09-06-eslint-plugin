// eslint-disable-next-line import/no-internal-modules -- Ok
import { getSynonyms } from "@/rules/utils";

test.each([
  {
    core: { aaa: "ccc" },
    expected: { "aaa/bbb": "ccc" },
    path: "./fixtures/synonyms.js"
  },
  {
    core: {},
    expected: {},
    path: "./fixtures/synonyms.missing.js"
  }
])("getSynonyms", ({ core, expected, path }) => {
  expect(getSynonyms(path, core)).toStrictEqual(expected);
});
