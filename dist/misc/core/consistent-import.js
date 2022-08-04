"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consistentImport = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const _ = tslib_1.__importStar(require("@skylib/lodash-commonjs-es"));
const utils = tslib_1.__importStar(require("../../utils"));
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
const minimatch_1 = tslib_1.__importDefault(require("minimatch"));
var MessageId;
(function (MessageId) {
    MessageId["autoImport"] = "autoImport";
    MessageId["invalidLocalName"] = "invalidLocalName";
    MessageId["wildcardDisallowed"] = "wildcardDisallowed";
    MessageId["wildcardRequired"] = "wildcardRequired";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.consistentImport = utils.createRule({
    name: "consistent-import",
    fixable: utils.Fixable.code,
    isSubOptions: functions_1.is.object.factory({
        _id: functions_1.is.string,
        altLocalNames: functions_1.is.strings,
        autoImport: functions_1.is.boolean,
        source: functions_1.is.string,
        wildcard: functions_1.is.boolean
    }, {
        autoImportSource: functions_1.is.string,
        localName: functions_1.is.string,
        sourcePattern: functions_1.is.string
    }),
    defaultSubOptions: { altLocalNames: [], autoImport: false, wildcard: false },
    subOptionsKey: "sources",
    messages: {
        [MessageId.autoImport]: 'Run "eslint --fix" to add missing import statement(s)',
        [MessageId.invalidLocalName]: "Expecting local name to be: {{expectedLocalName}} ({{_id}})",
        [MessageId.wildcardDisallowed]: "Wildcard import disallowed ({{_id}})",
        [MessageId.wildcardRequired]: "Wildcard import required ({{_id}})"
    },
    create: (context) => {
        const eol = context.eol;
        const identifiers = new Set();
        // eslint-disable-next-line @skylib/custom/prefer-readonly-array -- Postponed
        const importDeclarations = [];
        return {
            ":not(ImportDefaultSpecifier, ImportNamespaceSpecifier, ImportSpecifier, Property) > Identifier": (node) => {
                identifiers.add(node.name);
            },
            "ExportAllDeclaration": node => {
                if (node.exported) {
                    const subOptions = findSubOptions(node.source);
                    if (subOptions) {
                        const { _id, localName, wildcard } = subOptions;
                        if (wildcard)
                            if (node.exported.name === localName) {
                                // Valid name
                            }
                            else
                                context.report({
                                    data: { _id, expectedLocalName: localName },
                                    messageId: MessageId.invalidLocalName,
                                    node
                                });
                        else
                            context.report({
                                data: { _id },
                                messageId: MessageId.wildcardDisallowed,
                                node
                            });
                    }
                }
            },
            "ExportNamedDeclaration": node => {
                if (node.source) {
                    const subOptions = findSubOptions(node.source);
                    if (subOptions) {
                        const { _id, localName, wildcard } = subOptions;
                        if (wildcard)
                            context.report({
                                data: { _id },
                                messageId: MessageId.wildcardRequired,
                                node
                            });
                        else {
                            const specifier = node.specifiers.find(candidate => candidate.local.name === "default");
                            if (specifier)
                                if (specifier.exported.name === localName) {
                                    // Valid name
                                }
                                else
                                    context.report({
                                        data: { _id, expectedLocalName: localName },
                                        messageId: MessageId.invalidLocalName,
                                        node
                                    });
                        }
                    }
                }
            },
            "ImportDeclaration": node => {
                importDeclarations.push(node);
            },
            "Program:exit": (node) => {
                lintAutoImport(node);
                lintConsistent();
            },
            "Property > Identifier.value": (node) => {
                identifiers.add(node.name);
            }
        };
        function expectedLocalName(localName, altLocalNames) {
            return identifiers.has(localName) && altLocalNames.length
                ? altLocalNames.join(", ")
                : localName;
        }
        function findSubOptions(node) {
            const source = context.normalizeSource(node.value);
            const subOptions = functions_1.a
                .sort(context.subOptionsArray, reverseCompare)
                .find(candidate => {
                var _a;
                return (0, minimatch_1.default)(source, (_a = candidate.sourcePattern) !== null && _a !== void 0 ? _a : candidate.source, {
                    dot: true
                });
            });
            return subOptions
                ? Object.assign({ localName: utils.getIdentifierFromPath(source) }, subOptions) : undefined;
        }
        function lintAutoImport(node) {
            const fixes = _.uniq(functions_1.a.sort(context.subOptionsArray, compare).flatMap(subOptions => {
                const { autoImport, autoImportSource, localName, wildcard } = Object.assign({ autoImportSource: subOptions.source, localName: utils.getIdentifierFromPath(subOptions.source) }, subOptions);
                return autoImport
                    ? context.scope.through
                        .map(ref => {
                        if (ref.identifier.name === localName) {
                            context.report({
                                messageId: MessageId.autoImport,
                                node: ref.identifier
                            });
                            return wildcard
                                ? `import * as ${localName} from "${autoImportSource}";`
                                : `import ${localName} from "${autoImportSource}";`;
                        }
                        return undefined;
                    })
                        .filter(functions_1.is.not.empty)
                    : [];
            }));
            if (fixes.length)
                context.report({
                    fix: () => {
                        const fix = fixes.join(eol);
                        return {
                            range: [node.range[0], node.range[0]],
                            text: `${fix}${eol}`
                        };
                    },
                    loc: context.locZero,
                    messageId: MessageId.autoImport
                });
        }
        function lintConsistent() {
            for (const node of importDeclarations) {
                const subOptions = findSubOptions(node.source);
                if (subOptions) {
                    const { _id, altLocalNames, localName, wildcard } = subOptions;
                    const defaultSpecifier = node.specifiers.find(specifier => specifier.type === utils_1.AST_NODE_TYPES.ImportDefaultSpecifier);
                    const wildcardSpecifier = node.specifiers.find(specifier => specifier.type === utils_1.AST_NODE_TYPES.ImportNamespaceSpecifier);
                    if (wildcard)
                        if (wildcardSpecifier)
                            if (wildcardSpecifier.local.name === localName) {
                                // Valid name
                            }
                            else if (identifiers.has(localName) &&
                                altLocalNames.includes(wildcardSpecifier.local.name)) {
                                // Valid alt name
                            }
                            else
                                context.report({
                                    data: {
                                        _id,
                                        expectedLocalName: expectedLocalName(localName, altLocalNames)
                                    },
                                    messageId: MessageId.invalidLocalName,
                                    node
                                });
                        else
                            context.report({
                                data: { _id },
                                messageId: MessageId.wildcardRequired,
                                node
                            });
                    else {
                        if (defaultSpecifier)
                            if (defaultSpecifier.local.name === localName) {
                                // Valid name
                            }
                            else if (identifiers.has(localName) &&
                                altLocalNames.includes(defaultSpecifier.local.name)) {
                                // Valid alt name
                            }
                            else
                                context.report({
                                    data: {
                                        _id,
                                        expectedLocalName: expectedLocalName(localName, altLocalNames)
                                    },
                                    messageId: MessageId.invalidLocalName,
                                    node
                                });
                        if (wildcardSpecifier)
                            context.report({
                                data: { _id },
                                messageId: MessageId.wildcardDisallowed,
                                node
                            });
                    }
                }
            }
        }
    }
});
/**
 * Compares suboptions.
 *
 * @param subOptions1 - First suboptions.
 * @param subOptions2 - Second suboptions.
 * @returns - Comparison result.
 */
function compare(subOptions1, subOptions2) {
    return utils.compare(subOptions1._id, subOptions2._id);
}
/**
 * Compares suboptions.
 *
 * @param subOptions1 - First suboptions.
 * @param subOptions2 - Second suboptions.
 * @returns - Comparison result.
 */
function reverseCompare(subOptions1, subOptions2) {
    return utils.compare(subOptions2._id, subOptions1._id);
}
//# sourceMappingURL=consistent-import.js.map