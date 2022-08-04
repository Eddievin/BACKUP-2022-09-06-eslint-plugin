"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.mixedFromIncludeNonArray = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const typescript_1 = require("../../typescript");
exports.mixedFromIncludeNonArray = utils.wrapRule(typescript_1.typescript["restrict-syntax"], [
    {
        message: "Expecting type to include array",
        selector: "CallExpression[callee.object.name=a][callee.property.name=fromMixed] > .arguments:first-child",
        typeHasNoneOf: [
            utils.TypeGroup.boolean,
            utils.TypeGroup.function,
            utils.TypeGroup.number,
            utils.TypeGroup.object,
            utils.TypeGroup.string,
            utils.TypeGroup.symbol
        ]
    }
]);
//# sourceMappingURL=mixedFrom-include-non-array.js.map