/* eslint-disable import/no-internal-modules -- Ok */

import type { WritableIndexedObject } from "@skylib/functions";
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
  const dest: WritableIndexedObject = {};

  getSynonyms(dest, path, core);
  expect(dest).toStrictEqual(expected);
});
