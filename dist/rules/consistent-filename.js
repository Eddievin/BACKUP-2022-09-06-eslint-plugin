"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consistentFilename = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
const _ = tslib_1.__importStar(require("@skylib/lodash-commonjs-es"));
const node_path_1 = tslib_1.__importDefault(require("node:path"));
exports.consistentFilename = (0, functions_1.evaluate)(() => {
    const FormatVO = (0, functions_1.createValidationObject)({
        "PascalCase": "PascalCase",
        "camelCase": "camelCase",
        "kebab-case": "kebab-case"
    });
    const isFormat = functions_1.is.factory(functions_1.is.enumeration, FormatVO);
    const isRuleOptions = functions_1.is.object.factory({ format: isFormat }, {});
    const isSubOptions = functions_1.is.object.factory({ format: isFormat, selector: functions_1.is.string }, {});
    return utils.createRule({
        create: (context) => {
            let className;
            let format = context.options.format;
            return Object.assign(Object.assign({}, functions_1.o.fromEntries(context.subOptionsArray.map(subOptions => [
                subOptions.selector,
                () => {
                    format = subOptions.format;
                }
            ]))), { "Program > :matches(ExportDefaultDeclaration, ExportNamedDeclaration) > ClassDeclaration > Identifier.id": (node) => {
                    className = node.name;
                }, "Program:exit": () => {
                    const { base } = node_path_1.default.parse(context.path);
                    const expected = base
                        .split(".")
                        .map((part, index) => {
                        if (index === 0) {
                            if (functions_1.is.not.empty(className))
                                return className;
                            switch (format) {
                                case "PascalCase":
                                    return functions_1.s.ucFirst(_.camelCase(part));
                                case "camelCase":
                                    return _.camelCase(part);
                                case "kebab-case":
                                    return _.kebabCase(part);
                            }
                        }
                        return _.kebabCase(part);
                    })
                        .join(".");
                    if (base === expected) {
                        // Valid
                    }
                    else
                        context.report({
                            data: { expected },
                            loc: context.locZero,
                            messageId: "invalidFilename"
                        });
                } });
        },
        defaultOptions: { format: "kebab-case" },
        isRuleOptions,
        isSubOptions,
        messages: { invalidFilename: "Expecting file name to be: {{ expected }}" },
        name: "consistent-filename",
        subOptionsKey: "overrides"
    });
});
//# sourceMappingURL=consistent-filename.js.map