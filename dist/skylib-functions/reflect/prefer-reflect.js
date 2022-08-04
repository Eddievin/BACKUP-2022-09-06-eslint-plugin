"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferReflect = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.preferReflect = utils.wrapRule(misc_1.misc["restrict-syntax"], [
    { message: 'Prefer "reflect" module', selector: "Identifier[name=Reflect]" }
]);
//# sourceMappingURL=prefer-reflect.js.map