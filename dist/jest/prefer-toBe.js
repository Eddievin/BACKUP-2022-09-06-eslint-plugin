"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferToBe = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const typescript_1 = require("../typescript");
exports.preferToBe = utils.wrapRule(typescript_1.typescript["no-restricted-syntax"], [
    {
        message: 'Prefer "toBe" matcher',
        selector: "CallExpression[callee.property.name=toStrictEqual] > .arguments",
        typeIsOneOf: [
            utils.TypeGroup.boolean,
            utils.TypeGroup.number,
            utils.TypeGroup.string
        ]
    }
]);
//# sourceMappingURL=prefer-toBe.js.map