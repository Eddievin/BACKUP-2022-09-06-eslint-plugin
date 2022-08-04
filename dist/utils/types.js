"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTypeGroups = exports.isTypeGroup = exports.TypeGroup = exports.Fixable = void 0;
const functions_1 = require("@skylib/functions");
var Fixable;
(function (Fixable) {
    Fixable["code"] = "code";
    Fixable["whitespace"] = "whitespace";
})(Fixable = exports.Fixable || (exports.Fixable = {}));
var TypeGroup;
(function (TypeGroup) {
    TypeGroup["any"] = "any";
    TypeGroup["array"] = "array";
    TypeGroup["boolean"] = "boolean";
    TypeGroup["complex"] = "complex";
    TypeGroup["function"] = "function";
    TypeGroup["never"] = "never";
    TypeGroup["null"] = "null";
    TypeGroup["number"] = "number";
    TypeGroup["object"] = "object";
    TypeGroup["readonly"] = "readonly";
    TypeGroup["string"] = "string";
    TypeGroup["symbol"] = "symbol";
    TypeGroup["tuple"] = "tuple";
    // eslint-disable-next-line @typescript-eslint/no-shadow -- Wait for https://github.com/typescript-eslint/typescript-eslint/issues/5337
    TypeGroup["undefined"] = "undefined";
    TypeGroup["unknown"] = "unknown";
})(TypeGroup = exports.TypeGroup || (exports.TypeGroup = {}));
exports.isTypeGroup = functions_1.is.factory(functions_1.is.enumeration, TypeGroup);
exports.isTypeGroups = functions_1.is.factory(functions_1.is.array.of, exports.isTypeGroup);
//# sourceMappingURL=types.js.map