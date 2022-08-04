"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consistentOptionalProps = exports.isStyle = exports.Style = exports.isTarget = exports.Target = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
var MessageId;
(function (MessageId) {
    MessageId["combined"] = "combined";
    MessageId["combinedId"] = "combinedId";
    MessageId["optional"] = "optional";
    MessageId["optionalId"] = "optionalId";
    // eslint-disable-next-line @typescript-eslint/no-shadow -- Wait for https://github.com/typescript-eslint/typescript-eslint/issues/5337
    MessageId["undefined"] = "undefined";
    MessageId["undefinedId"] = "undefinedId";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
var Target;
(function (Target) {
    Target["classes"] = "classes";
    Target["interfaces"] = "interfaces";
})(Target = exports.Target || (exports.Target = {}));
exports.isTarget = functions_1.is.factory(functions_1.is.enumeration, Target);
var Style;
(function (Style) {
    Style["combined"] = "combined";
    Style["optional"] = "optional";
    // eslint-disable-next-line @typescript-eslint/no-shadow -- Wait for https://github.com/typescript-eslint/typescript-eslint/issues/5337
    Style["undefined"] = "undefined";
})(Style = exports.Style || (exports.Style = {}));
exports.isStyle = functions_1.is.factory(functions_1.is.enumeration, Style);
exports.consistentOptionalProps = utils.createRule({
    name: "consistent-optional-props",
    isOptions: functions_1.is.object.factory({ classes: exports.isStyle, interfaces: exports.isStyle }, {}),
    defaultOptions: { classes: Style.combined, interfaces: Style.combined },
    isSubOptions: functions_1.is.object.factory({
        _id: functions_1.is.string,
        pattern: utils.isPattern,
        propertyPattern: utils.isPattern,
        style: exports.isStyle
    }, { target: exports.isTarget }),
    defaultSubOptions: { pattern: [], propertyPattern: [] },
    subOptionsKey: "overrides",
    messages: {
        [MessageId.combined]: 'Prefer "x?: T | undefined" style',
        [MessageId.combinedId]: 'Prefer "x?: T | undefined" style ({{_id}})',
        [MessageId.optional]: 'Prefer "x?: T" style',
        [MessageId.optionalId]: 'Prefer "x?: T" style ({{_id}})',
        [MessageId.undefined]: 'Prefer "x: T | undefined" style',
        [MessageId.undefinedId]: 'Prefer "x: T | undefined" style ({{_id}})'
    },
    create: (context, typeCheck) => {
        const subOptionsArray = functions_1.a.sort(context.subOptionsArray.map((subOptions) => {
            const matcher = utils.createRegexpMatcher(subOptions.pattern, true);
            const properyMatcher = utils.createRegexpMatcher(subOptions.propertyPattern, true);
            return Object.assign(Object.assign({}, subOptions), { matcher, properyMatcher });
        }), reverseCompare);
        return {
            ClassDeclaration: lintClass,
            ClassExpression: lintClass,
            TSInterfaceDeclaration: lintInterface
        };
        function lintClass(node) {
            const name = node.id ? node.id.name : "?";
            for (const property of node.body.body)
                if (property.type === utils_1.AST_NODE_TYPES.PropertyDefinition ||
                    property.type === utils_1.AST_NODE_TYPES.TSAbstractPropertyDefinition)
                    lintProperty(property, Target.classes, name);
        }
        function lintInterface(node) {
            const name = node.id.name;
            for (const property of node.body.body)
                if (property.type === utils_1.AST_NODE_TYPES.TSPropertySignature)
                    lintProperty(property, Target.interfaces, name);
        }
        function lintProperty(node, target, name) {
            if (node.typeAnnotation) {
                const { typeAnnotation } = node.typeAnnotation;
                const got = (0, functions_1.evaluate)(() => {
                    var _a;
                    const type = typeCheck.getType(typeAnnotation);
                    const hasUndefined = typeCheck.typeHas(type, utils.TypeGroup.undefined);
                    const optional = (_a = node.optional) !== null && _a !== void 0 ? _a : false;
                    if (hasUndefined && optional)
                        return Style.combined;
                    if (hasUndefined)
                        return Style.undefined;
                    if (optional)
                        return Style.optional;
                    return undefined;
                });
                if (got) {
                    const subOptions = (0, functions_1.evaluate)(() => {
                        const propertyName = context.getMemberName(node);
                        const targets = new functions_1.ReadonlySet([target, undefined]);
                        return subOptionsArray.find(candidate => targets.has(candidate.target) &&
                            candidate.matcher(name) &&
                            candidate.properyMatcher(propertyName));
                    });
                    const expected = (0, functions_1.evaluate)(() => {
                        const result = subOptions
                            ? subOptions.style
                            : context.options[target];
                        return exclusionTypes.has(typeAnnotation.type) &&
                            exclusionStyles.has(got) &&
                            exclusionStyles.has(result)
                            ? undefined
                            : result;
                    });
                    if (expected) {
                        const data = subOptions
                            ? { _id: subOptions._id }
                            : {};
                        const messageId = (0, functions_1.evaluate)(() => {
                            switch (expected) {
                                case Style.combined:
                                    return subOptions ? MessageId.combinedId : MessageId.combined;
                                case Style.optional:
                                    return subOptions ? MessageId.optionalId : MessageId.optional;
                                case Style.undefined:
                                    return subOptions
                                        ? MessageId.undefinedId
                                        : MessageId.undefined;
                            }
                        });
                        if (got === expected) {
                            // Valid
                        }
                        else
                            context.report({ data, messageId, node });
                    }
                }
            }
        }
    }
});
const exclusionTypes = new functions_1.ReadonlySet([
    utils_1.AST_NODE_TYPES.TSAnyKeyword,
    utils_1.AST_NODE_TYPES.TSUnknownKeyword
]);
const exclusionStyles = new functions_1.ReadonlySet([Style.combined, Style.optional]);
/**
 * Compares matchers.
 *
 * @param matcher1 - First matcher.
 * @param matcher2 - Second matcher.
 * @returns - Comparison result.
 */
function reverseCompare(matcher1, matcher2) {
    return utils.compare(matcher2._id, matcher1._id);
}
//# sourceMappingURL=consistent-optional-props.js.map