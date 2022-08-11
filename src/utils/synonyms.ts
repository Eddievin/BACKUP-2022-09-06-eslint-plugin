import { a, as, is, o } from "@skylib/functions";
import type { IndexedObject } from "@skylib/functions";
import fs from "node:fs";

/**
 * Gets synonyms.
 *
 * @param path - Path.
 * @param core - Core.
 * @returns Synonyms.
 */
// eslint-disable-next-line @skylib/only-export-name -- Postponed
export function getSynonyms(path: string, core: IndexedObject): IndexedObject {
  if (fs.existsSync(path)) {
    const synonyms: unknown = require(fs.realpathSync(path));

    return o.fromEntries(
      as.array.of(synonyms, is.string).map(synonym => {
        const name = synonym.replace(/^@skylib\//u, "");

        return [name, o.get(core, a.first(name.split("/")))];
      })
    );
  }

  return {};
}
