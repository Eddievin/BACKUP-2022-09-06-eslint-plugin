"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferOwnProps = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.preferOwnProps = utils.wrapRule(misc_1.misc["restrict-syntax"], [
    {
        message: 'Use "OwnProps" interface',
        selector: "TSInterfaceDeclaration[id.name=/^(?:Props|ParentProps)$/u] > TSInterfaceBody.body > .body"
    }
]);
//# sourceMappingURL=prefer-OwnProps.js.map