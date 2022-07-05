"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSynonyms = void 0;
const tslib_1 = require("tslib");
const functions_1 = require("@skylib/functions");
const node_fs_1 = tslib_1.__importDefault(require("node:fs"));
/**
 * Gets synonyms.
 *
 * @param dest - Dest.
 * @param path - Path.
 * @param core - Core.
 */
// eslint-disable-next-line @skylib/only-export-name -- Ok
function getSynonyms(dest, path, core) {
    if (node_fs_1.default.existsSync(path)) {
        // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires, unicorn/prefer-module -- Wait for @skylib/config update
        const synonyms = functions_1.as.array.of(require(node_fs_1.default.realpathSync(path)), functions_1.is.string);
        for (const synonym of synonyms) {
            functions_1.assert.empty(dest[synonym], `Duplicate synonym: ${synonym}`);
            dest[synonym] = functions_1.o.get(core, functions_1.a.first(synonym.split("/")));
        }
    }
}
exports.getSynonyms = getSynonyms;
//# sourceMappingURL=synonyms.js.map