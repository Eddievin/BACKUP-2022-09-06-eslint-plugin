"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consistentFilename = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
const _ = tslib_1.__importStar(require("@skylib/lodash-commonjs-es"));
const node_path_1 = tslib_1.__importDefault(require("node:path"));
exports.consistentFilename = utils.createRule({
    create: context => {
        let className;
        return {
            "Program > :matches(ExportDefaultDeclaration, ExportNamedDeclaration) > ClassDeclaration > Identifier.id": (node) => {
                className = node.name;
            },
            "Program:exit": () => {
                const got = node_path_1.default.parse(context.path).name;
                const expected = className !== null && className !== void 0 ? className : got
                    .split(".")
                    .map(part => _.kebabCase(part))
                    .join(".");
                if (got === expected) {
                    // Valid
                }
                else
                    context.report({
                        loc: context.locZero,
                        messageId: "invalidFilename"
                    });
            }
        };
    },
    isRuleOptions: functions_1.is.object,
    messages: { invalidFilename: "Invalid file name" },
    name: "filename"
});
//# sourceMappingURL=consistent-filename.js.map