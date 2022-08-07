"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.falseAlwaysFalse = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const typescript_1 = require("../../typescript");
exports.falseAlwaysFalse = utils.wrapRule(typescript_1.typescript["no-restricted-syntax"], [
    {
        message: "Expecting type to include boolean or unknown",
        selector: "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=false] > .arguments:first-child",
        typeHasNoneOf: [
            utils.TypeGroup.any,
            utils.TypeGroup.boolean,
            utils.TypeGroup.unknown
        ]
    }
]);
//# sourceMappingURL=false-always-false.js.map