"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consistentOptionalProps = exports.isStyle = exports.Style = exports.isTarget = exports.Target = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
var MessageId;
(function (MessageId) {
    MessageId["combined"] = "combined";
    MessageId["combinedId"] = "combinedId";
    MessageId["optional"] = "optional";
    MessageId["optionalId"] = "optionalId";
    // eslint-disable-next-line @typescript-eslint/no-shadow -- Postponed
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
    isSubOptions: functions_1.is.object.factory({ _id: functions_1.is.string, style: exports.isStyle }, {
        pattern: utils.isPattern,
        propertyPattern: utils.isPattern,
        target: exports.isTarget
    }),
    subOptionsKey: "overrides",
    messages: {
        [MessageId.combined]: 'Define optional property as "x?: string | undefined"',
        [MessageId.optional]: 'Define optional property as "x?: string"',
        [MessageId.optionalId]: 'Define optional property as "x?: string" ({{ id }})',
        [MessageId.undefined]: 'Define optional property as "x: string | undefined"',
        [MessageId.undefinedId]: 'Define optional property as "x: string | undefined" ({{ id }})',
        combinedId: 'Define optional property as "x?: string | undefined" ({{ id }})'
    },
    create: (context) => {
        const interchangeableStyles = new functions_1.ReadonlySet([
            Style.combined,
            Style.optional
        ]);
        const interchangeableTypes = new functions_1.ReadonlySet([
            utils_1.AST_NODE_TYPES.TSAnyKeyword,
            utils_1.AST_NODE_TYPES.TSUnknownKeyword
        ]);
        const nodeTypeToTarget = {
            [utils_1.AST_NODE_TYPES.ClassDeclaration]: Target.classes,
            [utils_1.AST_NODE_TYPES.ClassExpression]: Target.classes,
            [utils_1.AST_NODE_TYPES.TSInterfaceDeclaration]: Target.interfaces
        };
        const matchers = functions_1.a.reverse(context.subOptionsArray.map((subOptions) => (Object.assign(Object.assign({}, subOptions), { nodeName: utils.createMatcher(subOptions.pattern, true), propName: utils.createMatcher(subOptions.propertyPattern, true) }))));
        return {
            ClassDeclaration: lintNode,
            ClassExpression: lintNode,
            TSInterfaceDeclaration: lintNode
        };
        function lintNode(node) {
            const name = node.id ? node.id.name : "?";
            const target = nodeTypeToTarget[node.type];
            for (const property of node.body.body)
                switch (property.type) {
                    case utils_1.AST_NODE_TYPES.PropertyDefinition:
                    case utils_1.AST_NODE_TYPES.TSAbstractPropertyDefinition:
                    case utils_1.AST_NODE_TYPES.TSPropertySignature:
                        lintProperty(property, target, name);
                        break;
                    default:
                    // Skip
                }
        }
        function lintProperty(node, target, name) {
            if (node.typeAnnotation) {
                const typeAnnotation = node.typeAnnotation.typeAnnotation;
                const got = (0, functions_1.evaluate)(() => {
                    var _a;
                    const type = context.typeCheck.getType(typeAnnotation);
                    const hasUndefined = context.typeCheck.typeHas(type, utils.TypeGroup.undefined);
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
                    const matcher = matchers.find(candidate => new functions_1.ReadonlySet([target, undefined]).has(candidate.target) &&
                        candidate.nodeName(name) &&
                        candidate.propName(context.getMemberName(node)));
                    const expected = (0, functions_1.evaluate)(() => {
                        const result = matcher ? matcher.style : context.options[target];
                        return interchangeableTypes.has(typeAnnotation.type) &&
                            interchangeableStyles.has(got) &&
                            interchangeableStyles.has(result)
                            ? got
                            : result;
                    });
                    const messageId = (0, functions_1.evaluate)(() => {
                        switch (expected) {
                            case Style.combined:
                                return matcher ? MessageId.combinedId : MessageId.combined;
                            case Style.optional:
                                return matcher ? MessageId.optionalId : MessageId.optional;
                            case Style.undefined:
                                return matcher ? MessageId.undefinedId : MessageId.undefined;
                        }
                    });
                    if (got === expected) {
                        // Valid
                    }
                    else if (matcher)
                        context.report({
                            data: { id: matcher._id },
                            messageId,
                            node
                        });
                    else
                        context.report({ messageId, node });
                }
            }
        }
    }
});
//# sourceMappingURL=consistent-optional-props.js.map