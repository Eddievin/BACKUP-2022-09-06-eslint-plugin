// eslint-disable-next-line import/no-internal-modules -- Ok
import { getSynonyms } from "@/rules/utils";
import type { WritableIndexedObject } from "@skylib/functions";

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
  const dest: WritableIndexedObject = {};

  getSynonyms(dest, path, core);
  expect(dest).toStrictEqual(expected);
});
