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

    // eslint-disable-next-line no-warning-comments -- Postponed
    // fixme - Synonym should start with "@skylib/"
    for (const synonym of as.array.of(synonyms, is.string)) {
      const name = synonym.replace(/^@skylib\//u, "");

      assert.empty(dest[name], `Duplicate synonym: ${synonym}`);
      dest[name] = o.get(core, a.first(name.split("/")));
    }
  }
}
