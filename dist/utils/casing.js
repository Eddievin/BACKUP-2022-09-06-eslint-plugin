"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.format = exports.isFormat = exports.Format = void 0;
const tslib_1 = require("tslib");
const _ = tslib_1.__importStar(require("@skylib/lodash-commonjs-es"));
const functions_1 = require("@skylib/functions");
var Format;
(function (Format) {
    Format["camelCase"] = "camelCase";
    Format["kebabCase"] = "kebab-case";
    Format["pascalCase"] = "PascalCase";
})(Format = exports.Format || (exports.Format = {}));
exports.isFormat = functions_1.is.factory(functions_1.is.enumeration, Format);
/**
 * Sets string case.
 *
 * @param str - String.
 * @param caseOption - Case option.
 * @returns String in given case.
 */
function format(str, caseOption) {
    switch (caseOption) {
        case Format.camelCase:
            return _.camelCase(str);
        case Format.kebabCase:
            return _.kebabCase(str);
        case Format.pascalCase:
            return functions_1.s.ucFirst(_.camelCase(str));
    }
}
exports.format = format;
//# sourceMappingURL=casing.js.map