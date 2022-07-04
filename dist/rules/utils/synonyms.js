"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSynonyms = void 0;
const tslib_1 = require("tslib");
const functions_1 = require("@skylib/functions");
const node_fs_1 = tslib_1.__importDefault(require("node:fs"));
/**
 * Returns synonyms.
 *
 * @param path - Path.
 * @param core - Core.
 * @returns Synonyms.
 */
// eslint-disable-next-line @skylib/only-export-name -- Ok
function getSynonyms(path, core) {
    return node_fs_1.default.existsSync(path)
        ? functions_1.o.fromEntries(functions_1.as.array
            .of(
        // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires, unicorn/prefer-module -- Wait for @skylib/config update
        require(node_fs_1.default.realpathSync(path)), functions_1.is.string)
            .map(synonym => [synonym, functions_1.o.get(core, functions_1.a.first(synonym.split("/")))]))
        : {};
}
exports.getSynonyms = getSynonyms;
//# sourceMappingURL=synonyms.js.map