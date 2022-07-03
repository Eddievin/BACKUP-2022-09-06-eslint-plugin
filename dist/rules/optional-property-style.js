"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalPropertyStyle = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
const ts = tslib_1.__importStar(require("typescript"));
exports.optionalPropertyStyle = (0, functions_1.evaluate)(() => {
    const StyleVO = (0, functions_1.createValidationObject)({
        combined: "combined",
        optional: "optional",
        undefined: "undefined"
    });
    const TargetVO = (0, functions_1.createValidationObject)({
        classes: "classes",
        interfaces: "interfaces"
    });
    const isStyle = functions_1.is.factory(functions_1.is.enumeration, StyleVO);
    const isTarget = functions_1.is.factory(functions_1.is.enumeration, TargetVO);
    return utils.createRule({
        // eslint-disable-next-line sonarjs/cognitive-complexity
        create: context => {
            return {
                "ClassDeclaration, ClassExpression, TSInterfaceDeclaration": (node) => {
                    var _a;
                    const name = (_a = node.id) === null || _a === void 0 ? void 0 : _a.name;
                    const target = (0, functions_1.evaluate)(() => {
                        switch (node.type) {
                            case utils_1.AST_NODE_TYPES.ClassDeclaration:
                            case utils_1.AST_NODE_TYPES.ClassExpression:
                                return "classes";
                            case utils_1.AST_NODE_TYPES.TSInterfaceDeclaration:
                                return "interfaces";
                        }
                    });
                    for (const property of node.body.body)
                        switch (property.type) {
                            case utils_1.AST_NODE_TYPES.PropertyDefinition:
                            case utils_1.AST_NODE_TYPES.TSAbstractPropertyDefinition:
                            case utils_1.AST_NODE_TYPES.TSPropertySignature:
                                lintNode(property, target, name);
                                break;
                            default:
                            // Skip
                        }
                }
            };
            function lintNode(node, target, name = "") {
                if (node.typeAnnotation) {
                    const tsNode = context.toTsNode(node.typeAnnotation.typeAnnotation);
                    const type = context.checker.getTypeAtLocation(tsNode);
                    const got = (0, functions_1.evaluate)(() => {
                        var _a;
                        const optional = (_a = node.optional) !== null && _a !== void 0 ? _a : false;
                        const hasUndefined = type.isUnion() &&
                            type.types.some(subtype => subtype.getFlags() === ts.TypeFlags.Undefined);
                        if (optional && hasUndefined)
                            return "combined";
                        if (optional)
                            return "optional";
                        if (hasUndefined)
                            return "undefined";
                        return undefined;
                    });
                    const expected = (0, functions_1.evaluate)(() => {
                        var _a;
                        const targets = new Set([target, undefined]);
                        return ((_a = context.subOptionsArray
                            .map(subOptions => {
                            const matcher = subOptions.patterns
                                ? utils.createMatcher(subOptions.patterns)
                                : () => true;
                            const propertyMatcher = subOptions.propertyPatterns
                                ? utils.createMatcher(subOptions.propertyPatterns)
                                : () => true;
                            return targets.has(subOptions.target) &&
                                matcher(name) &&
                                propertyMatcher(context.getMemberName(node))
                                ? subOptions.style
                                : undefined;
                        })
                            .filter(functions_1.is.not.empty)
                            .pop()) !== null && _a !== void 0 ? _a : context.options[target]);
                    });
                    if (node.typeAnnotation.typeAnnotation.type ===
                        utils_1.AST_NODE_TYPES.TSAnyKeyword ||
                        node.typeAnnotation.typeAnnotation.type ===
                            utils_1.AST_NODE_TYPES.TSUnknownKeyword)
                        if (got === "optional" && expected === "undefined")
                            context.report({ messageId: "expectingUndefinedStyle", node });
                        else {
                            // Valid
                        }
                    else if (got && got !== expected)
                        switch (expected) {
                            case "combined":
                                context.report({ messageId: "expectingCombinedStyle", node });
                                break;
                            case "optional":
                                context.report({ messageId: "expectingOptionalStyle", node });
                                break;
                            case "undefined":
                                context.report({ messageId: "expectingUndefinedStyle", node });
                        }
                    else {
                        // Valid
                    }
                }
            }
        },
        defaultOptions: { classes: "combined", interfaces: "combined" },
        isRuleOptions: functions_1.is.object.factory({ classes: isStyle, interfaces: isStyle }, {}),
        isSubOptions: functions_1.is.object.factory({ _id: functions_1.is.string, style: isStyle }, {
            patterns: functions_1.is.strings,
            propertyPatterns: functions_1.is.strings,
            target: isTarget
        }),
        messages: {
            expectingCombinedStyle: "Expecting combined style for optional property (e.g. x?: string | undefined) ({{ _id }})",
            expectingOptionalStyle: "Expecting optional style for optional property (e.g. x?: string) ({{ _id }})",
            expectingUndefinedStyle: "Expecting undefined style for optional property (e.g. x: string | undefined) ({{ _id }})"
        },
        name: "optional-property-style",
        subOptionsKey: "overrides"
    });
});
//# sourceMappingURL=optional-property-style.js.map