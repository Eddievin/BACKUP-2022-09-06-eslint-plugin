"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consistentImport = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
const minimatch_1 = tslib_1.__importDefault(require("minimatch"));
const path_1 = tslib_1.__importDefault(require("path"));
exports.consistentImport = utils.createRule({
    create: context => {
        const identifiers = new Set();
        const importDeclarations = [];
        return {
            [utils_1.AST_NODE_TYPES.ImportDeclaration]: (node) => {
                importDeclarations.push(node);
            },
            ":not(ImportDefaultSpecifier,ImportNamespaceSpecifier,ImportSpecifier,Property) > Identifier:not(.property)": (node) => {
                identifiers.add(node.name);
            },
            "Program:exit": (program) => {
                autoImport(program, context);
                checkImport(importDeclarations, identifiers, context);
            },
            "Property > Identifier.value": (node) => {
                identifiers.add(node.name);
            }
        };
    },
    defaultSubOptions: { altLocalNames: [] },
    fixable: "code",
    isRuleOptions: functions_1.is.object,
    isSubOptions: functions_1.fn.run(() => {
        const TypeVO = (0, functions_1.createValidationObject)({
            default: "default",
            wildcard: "wildcard"
        });
        const isType = functions_1.is.factory(functions_1.is.enumeration, TypeVO);
        return functions_1.is.object.factory({
            altLocalNames: functions_1.is.strings,
            sourcePattern: functions_1.is.string,
            type: isType
        }, { autoImportSource: functions_1.is.string, localName: functions_1.is.string });
    }),
    messages: {
        autoImport: 'Run "eslint --fix" to add missing import statement(s)',
        invalidLocalName: "Expecting local name to be {{ expectedLocalName }}",
        missingImport: "Missing import statement",
        wildcardImportDisallowed: "Wildcard import disallowed",
        wildcardImportRequired: "Wildcard import required"
    },
    name: "consistent-import",
    subOptionsKey: "sources"
});
/**
 * Adds missing import statements.
 *
 * @param program - Program node.
 * @param context - Context.
 */
function autoImport(program, context) {
    const fixes = new Set();
    for (const subOptions of context.subOptionsArray) {
        const localName = getLocalName(subOptions);
        for (const ref of context.scope.through)
            if (ref.identifier.name === localName) {
                fixes.add(getFix(subOptions));
                context.report({ messageId: "missingImport", node: ref.identifier });
            }
    }
    if (fixes.size)
        context.report({
            fix: () => {
                const fix = functions_1.a.fromIterable(fixes).join(context.eol);
                return [
                    {
                        range: program.range,
                        text: `${fix}${context.eol}${context.getText(program)}`
                    }
                ];
            },
            loc: context.locZero,
            messageId: "autoImport"
        });
}
/**
 * Checks import.
 *
 * @param importDeclarations - Import declarations.
 * @param identifiers - Identifiers.
 * @param context - Context.
 */
function checkImport(importDeclarations, identifiers, context) {
    for (const node of importDeclarations) {
        const defaultSpecifier = node.specifiers.find(specifier => specifier.type === utils_1.AST_NODE_TYPES.ImportDefaultSpecifier);
        const wildcardSpecifier = node.specifiers.find(specifier => specifier.type === utils_1.AST_NODE_TYPES.ImportNamespaceSpecifier);
        const source = normalizeSource(node.source.value, context);
        functions_1.assert.string(source);
        const subOptions = context.subOptionsArray.find(candidate => (0, minimatch_1.default)(source, candidate.sourcePattern, { dot: true }));
        if (subOptions) {
            const localName = getLocalName(subOptions);
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
                                    expectedLocalName: getExpectedLocalName(identifiers, subOptions)
                                },
                                messageId: "invalidLocalName",
                                node
                            });
                    if (wildcardSpecifier)
                        context.report({ messageId: "wildcardImportDisallowed", node });
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
                                    expectedLocalName: getExpectedLocalName(identifiers, subOptions)
                                },
                                messageId: "invalidLocalName",
                                node
                            });
                    else
                        context.report({ messageId: "wildcardImportRequired", node });
            }
        }
        else {
            if (defaultSpecifier) {
                const localName = identifierFromPath(source);
                if (defaultSpecifier.local.name === localName) {
                    // Valid name
                }
                else
                    context.report({
                        data: { expectedLocalName: `"${localName}"` },
                        messageId: "invalidLocalName",
                        node
                    });
            }
            if (wildcardSpecifier)
                context.report({ messageId: "wildcardImportDisallowed", node });
        }
    }
}
/**
 * Gets expected local name.
 *
 * @param identifiers - Identifiers.
 * @param subOptions - Suboptions.
 * @returns Expected local name.
 */
function getExpectedLocalName(identifiers, subOptions) {
    const localName = getLocalName(subOptions);
    return identifiers.has(localName) && subOptions.altLocalNames.length
        ? `"${subOptions.altLocalNames.join(", ")}"`
        : `"${localName}"`;
}
/**
 * Gets fix.
 *
 * @param subOptions - Suboptions.
 * @returns Fix.
 */
function getFix(subOptions) {
    const localName = getLocalName(subOptions);
    const source = getSource(subOptions);
    switch (subOptions.type) {
        case "default":
            return `import ${localName} from "${source}";`;
        case "wildcard":
            return `import * as ${localName} from "${source}";`;
    }
}
/**
 * Gets local name.
 *
 * @param subOptions - Suboptions.
 * @returns Local name.
 */
function getLocalName(subOptions) {
    var _a;
    return (_a = subOptions.localName) !== null && _a !== void 0 ? _a : identifierFromPath(getSource(subOptions));
}
/**
 * Gets source.
 *
 * @param subOptions - Suboptions.
 * @returns Source.
 */
function getSource(subOptions) {
    var _a;
    return (_a = subOptions.autoImportSource) !== null && _a !== void 0 ? _a : subOptions.sourcePattern;
}
/**
 * Creates identifier from path.
 *
 * @param path - Path.
 * @returns Identifier.
 */
function identifierFromPath(path) {
    return path_1.default
        .basename(path)
        .split(".")
        .filter(part => part.length)
        .slice(0, 1)
        .join(",")
        .replace(/\W\w/gu, substr => substr.slice(1, 2).toUpperCase())
        .replace(/\W/gu, "");
}
/**
 * Gets normalized source.
 *
 * @param source - Source.
 * @param context - Context.
 * @returns Normalized source.
 */
function normalizeSource(source, context) {
    source = functions_1.fn.run(() => {
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
            const path = utils.stripBase(path_1.default.join(path_1.default.dirname(context.path), source));
            return `${context.package.name}/${path}`;
        }
        return source;
    });
    return functions_1.s.path.canonicalize(source);
}
//# sourceMappingURL=consistent-import.js.map