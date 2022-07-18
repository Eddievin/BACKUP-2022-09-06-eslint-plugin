"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consistentImport = exports.isType = exports.Type = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const _ = tslib_1.__importStar(require("@skylib/lodash-commonjs-es"));
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
const minimatch_1 = tslib_1.__importDefault(require("minimatch"));
const node_path_1 = tslib_1.__importDefault(require("node:path"));
var MessageId;
(function (MessageId) {
    MessageId["autoImport"] = "autoImport";
    MessageId["invalidLocalName"] = "invalidLocalName";
    MessageId["missingImport"] = "missingImport";
    MessageId["wildcardImportDisallowed"] = "wildcardImportDisallowed";
    MessageId["wildcardImportRequired"] = "wildcardImportRequired";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
var Type;
(function (Type) {
    Type["default"] = "default";
    Type["wildcard"] = "wildcard";
})(Type = exports.Type || (exports.Type = {}));
exports.isType = functions_1.is.factory(functions_1.is.enumeration, Type);
exports.consistentImport = utils.createRule({
    name: "consistent-import",
    fixable: utils.Fixable.code,
    isSubOptions: functions_1.is.object.factory({
        _id: functions_1.is.string,
        altLocalNames: functions_1.is.strings,
        source: functions_1.is.string,
        type: exports.isType
    }, {
        autoImport: functions_1.is.boolean,
        autoImportSource: functions_1.is.string,
        localName: functions_1.is.string,
        sourcePattern: functions_1.is.string
    }),
    defaultSubOptions: { altLocalNames: [] },
    subOptionsKey: "sources",
    messages: {
        [MessageId.autoImport]: 'Run "eslint --fix" to add missing import statement(s)',
        [MessageId.invalidLocalName]: "Expecting local name to be {{ expectedLocalName }} ({{ _id }})",
        [MessageId.missingImport]: "Missing import statement",
        [MessageId.wildcardImportDisallowed]: "Wildcard import disallowed ({{ _id }})",
        [MessageId.wildcardImportRequired]: "Wildcard import required ({{ _id }})"
    },
    create: (context) => {
        const identifiers = new Set();
        // eslint-disable-next-line @skylib/custom/prefer-readonly-array -- Postponed
        const importDeclarations = [];
        return {
            ":not(ImportDefaultSpecifier,ImportNamespaceSpecifier,ImportSpecifier,Property) > Identifier:not(.property)": (node) => {
                identifiers.add(node.name);
            },
            "ImportDeclaration": (node) => {
                importDeclarations.push(node);
            },
            "Program:exit": (program) => {
                autoImportFn(program);
                checkImport();
            },
            "Property > Identifier.value": (node) => {
                identifiers.add(node.name);
            }
        };
        function autoImportFn(program) {
            const fixes = _.uniq(functions_1.a.fromIterable((0, functions_1.evaluate)(function* () {
                for (const subOptions of context.subOptionsArray) {
                    const { autoImport, autoImportSource, localName } = Object.assign({ autoImport: false, autoImportSource: subOptions.source, localName: utils.getIdentifierFromPath(subOptions.source) }, subOptions);
                    if (autoImport)
                        for (const ref of context.scope.through)
                            if (ref.identifier.name === localName) {
                                context.report({
                                    messageId: MessageId.missingImport,
                                    node: ref.identifier
                                });
                                switch (subOptions.type) {
                                    case "default":
                                        yield `import ${localName} from "${autoImportSource}";`;
                                        break;
                                    case "wildcard":
                                        yield `import * as ${localName} from "${autoImportSource}";`;
                                }
                            }
                }
            })));
            if (fixes.length > 0)
                context.report({
                    fix: () => {
                        const fix = functions_1.a.fromIterable(fixes).join(context.eol);
                        return {
                            range: program.range,
                            text: `${fix}${context.eol}${context.getText(program)}`
                        };
                    },
                    loc: context.locZero,
                    messageId: MessageId.autoImport
                });
        }
        function checkImport() {
            var _a;
            for (const node of importDeclarations) {
                const defaultSpecifier = node.specifiers.find(specifier => specifier.type === "ImportDefaultSpecifier");
                const wildcardSpecifier = node.specifiers.find(specifier => specifier.type === "ImportNamespaceSpecifier");
                const source = normalizeSource(node.source.value);
                const subOptions = context.subOptionsArray.find(candidate => {
                    var _a;
                    return (0, minimatch_1.default)(source, (_a = candidate.sourcePattern) !== null && _a !== void 0 ? _a : candidate.source, {
                        dot: true
                    });
                });
                if (subOptions) {
                    const localName = (_a = subOptions.localName) !== null && _a !== void 0 ? _a : identifierFromPath(source);
                    switch (subOptions.type) {
                        case "default":
                            if (defaultSpecifier)
                                if (defaultSpecifier.local.name === localName) {
                                    // Valid name
                                }
                                else if (identifiers.has(localName) &&
                                    subOptions.altLocalNames.includes(defaultSpecifier.local.name)) {
                                    // Valid alt name
                                }
                                else
                                    context.report({
                                        data: {
                                            _id: subOptions._id,
                                            expectedLocalName: getExpectedLocalName(localName, subOptions.altLocalNames, identifiers)
                                        },
                                        messageId: MessageId.invalidLocalName,
                                        node
                                    });
                            if (wildcardSpecifier)
                                context.report({
                                    data: { _id: subOptions._id },
                                    messageId: MessageId.wildcardImportDisallowed,
                                    node
                                });
                            break;
                        case "wildcard":
                            if (wildcardSpecifier)
                                if (wildcardSpecifier.local.name === localName) {
                                    // Valid name
                                }
                                else if (identifiers.has(localName) &&
                                    subOptions.altLocalNames.includes(wildcardSpecifier.local.name)) {
                                    // Valid alt name
                                }
                                else
                                    context.report({
                                        data: {
                                            _id: subOptions._id,
                                            expectedLocalName: getExpectedLocalName(localName, subOptions.altLocalNames, identifiers)
                                        },
                                        messageId: MessageId.invalidLocalName,
                                        node
                                    });
                            else
                                context.report({
                                    data: { _id: subOptions._id },
                                    messageId: MessageId.wildcardImportRequired,
                                    node
                                });
                    }
                }
            }
        }
        function normalizeSource(source) {
            source = (0, functions_1.evaluate)(() => {
                if (source === "@") {
                    functions_1.assert.not.empty(context.package.name, "Missing package name");
                    return `${context.package.name}`;
                }
                if (source.startsWith("@/")) {
                    functions_1.assert.not.empty(context.package.name, "Missing package name");
                    const path = `src/${source.slice(2)}`;
                    return `${context.package.name}/${path}`;
                }
                if (source === "." ||
                    source === ".." ||
                    source.startsWith("./") ||
                    source.startsWith("../")) {
                    functions_1.assert.not.empty(context.package.name, "Missing package name");
                    const path = utils.stripBase(node_path_1.default.join(node_path_1.default.dirname(context.path), source));
                    return `${context.package.name}/${path}`;
                }
                return source;
            });
            return functions_1.s.path.canonicalize(source);
        }
    }
});
/**
 * Gets expected local name.
 *
 * @param localName - Local name.
 * @param altLocalNames - Alt names.
 * @param identifiers - Identifiers.
 * @returns Expected local name.
 */
function getExpectedLocalName(localName, altLocalNames, identifiers) {
    return identifiers.has(localName) && altLocalNames.length
        ? `"${altLocalNames.join(", ")}"`
        : `"${localName}"`;
}
/**
 * Creates identifier from path.
 *
 * @param path - Path.
 * @returns Identifier.
 */
function identifierFromPath(path) {
    return node_path_1.default
        .basename(path)
        .split(".")
        .filter(part => part.length)
        .slice(0, 1)
        .join(",")
        .replace(/\W\w/gu, substr => substr.slice(1, 2).toUpperCase())
        .replace(/\W/gu, "");
}
//# sourceMappingURL=consistent-import.js.map