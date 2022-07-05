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
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires, unicorn/prefer-module -- Wait for @skylib/config update
    const synonyms = as.array.of(require(fs.realpathSync(path)), is.string);

    for (const synonym of synonyms) {
      assert.empty(dest[synonym], `Duplicate synonym: ${synonym}`);
      dest[synonym] = o.get(core, a.first(synonym.split("/")));
    }
  }
}
