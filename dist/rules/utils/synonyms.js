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
        const synonyms = require(node_fs_1.default.realpathSync(path));
        // eslint-disable-next-line no-warning-comments -- Postponed
        // fixme - Synonym should start with "@skylib/"
        for (const synonym of functions_1.as.array.of(synonyms, functions_1.is.string)) {
            const name = synonym.replace(/^@skylib\//u, "");
            functions_1.assert.empty(dest[name], `Duplicate synonym: ${synonym}`);
            dest[name] = functions_1.o.get(core, functions_1.a.first(name.split("/")));
        }
    }
}
exports.getSynonyms = getSynonyms;
//# sourceMappingURL=synonyms.js.map