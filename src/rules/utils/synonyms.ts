import { a, as, assert, is, o } from "@skylib/functions";
import fs from "node:fs";
import type { IndexedObject, WritableIndexedObject } from "@skylib/functions";

/**
 * Gets synonyms.
 *
 * @param dest - Dest.
 * @param path - Path.
 * @param core - Core.
 */
// eslint-disable-next-line @skylib/only-export-name -- Ok
export function getSynonyms(
  dest: WritableIndexedObject,
  path: string,
  core: IndexedObject
): void {
  if (fs.existsSync(path)) {
    const synonyms: unknown = require(fs.realpathSync(path));

    for (const synonym of as.array.of(synonyms, is.string)) {
      assert.empty(dest[synonym], `Duplicate synonym: ${synonym}`);
      dest[synonym] = o.get(core, a.first(synonym.split("/")));
    }
  }
}
