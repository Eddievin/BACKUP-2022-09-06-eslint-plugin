"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.noOwnPropsExtends = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.noOwnPropsExtends = utils.wrapRule(misc_1.misc["restrict-syntax"], [
    {
        message: 'Do not extend "OwnProps" interface',
        selector: "TSInterfaceDeclaration[id.name=OwnProps] > TSInterfaceHeritage.extends"
    }
]);
//# sourceMappingURL=no-OwnProps-extends.js.map