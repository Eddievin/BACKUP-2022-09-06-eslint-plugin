"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSynonyms = void 0;
const tslib_1 = require("tslib");
const functions_1 = require("@skylib/functions");
const node_fs_1 = tslib_1.__importDefault(require("node:fs"));
/**
 * Gets synonyms.
 *
 * @param path - Path.
 * @param core - Core.
 * @returns Synonyms.
 */
// eslint-disable-next-line @skylib/only-export-name -- Ok
function getSynonyms(path, core) {
    if (node_fs_1.default.existsSync(path)) {
        const synonyms = require(node_fs_1.default.realpathSync(path));
        return functions_1.o.fromEntries(functions_1.as.array.of(synonyms, functions_1.is.string).map(synonym => {
            const name = synonym.replace(/^@skylib\//u, "");
            return [name, functions_1.o.get(core, functions_1.a.first(name.split("/")))];
        }));
    }
    return {};
}
exports.getSynonyms = getSynonyms;
//# sourceMappingURL=synonyms.js.map