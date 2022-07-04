import { a, as, is, o } from "@skylib/functions";
import fs from "node:fs";
import type { IndexedObject } from "@skylib/functions";

/**
 * Returns synonyms.
 *
 * @param path - Path.
 * @param core - Core.
 * @returns Synonyms.
 */
// eslint-disable-next-line @skylib/only-export-name -- Ok
export function getSynonyms(path: string, core: IndexedObject): IndexedObject {
  return fs.existsSync(path)
    ? o.fromEntries(
        as.array
          .of(
            // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires, unicorn/prefer-module -- Wait for @skylib/config update
            require(fs.realpathSync(path)),
            is.string
          )
          .map(synonym => [synonym, o.get(core, a.first(synonym.split("/")))])
      )
    : {};
}
