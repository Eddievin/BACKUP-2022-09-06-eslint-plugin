"use strict";
/* eslint-disable @skylib/only-export-name -- Postponed */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBetterContext = void 0;
const tslib_1 = require("tslib");
const functions_1 = require("@skylib/functions");
const core_1 = require("./core");
const utils_1 = require("@typescript-eslint/utils");
const node_path_1 = tslib_1.__importDefault(require("node:path"));
/**
 * Creates better context.
 *
 * @param context - Context.
 * @param ruleOptionsArray - Raw rule options array.
 * @param options - Options.
 * @returns Better context.
 */
function createBetterContext(context, ruleOptionsArray, options) {
    const id = context.id;
    const path = context.getFilename();
    const source = context.getSourceCode();
    const code = source.getText();
    const _package = (0, core_1.getPackage)();
    return {
        eol: functions_1.s.detectEol(code),
        getComments: (node) => source.getCommentsBefore(node).map(comment => comment.range),
        getFullRange: (node) => [
            Math.min(node.range[0], ...source.getCommentsBefore(node).map(comment => comment.range[0])),
            node.range[1]
        ],
        getFullText: (node) => code.slice(Math.min(node.range[0], ...source.getCommentsBefore(node).map(comment => comment.range[0])), node.range[1]),
        getLeadingSpaces: (node) => {
            const end = Math.min(node.range[0], ...source.getCommentsBefore(node).map(comment => comment.range[0]));
            const pos = code.slice(0, end).trimEnd().length;
            return [pos, end];
        },
        getLoc(range) {
            return {
                end: source.getLocFromIndex(range[1]),
                start: source.getLocFromIndex(range[0])
            };
        },
        getMemberName(node) {
            switch (node.type) {
                case utils_1.AST_NODE_TYPES.MethodDefinition:
                case utils_1.AST_NODE_TYPES.PropertyDefinition:
                case utils_1.AST_NODE_TYPES.TSAbstractMethodDefinition:
                case utils_1.AST_NODE_TYPES.TSAbstractPropertyDefinition:
                case utils_1.AST_NODE_TYPES.TSMethodSignature:
                case utils_1.AST_NODE_TYPES.TSPropertySignature:
                    switch (node.key.type) {
                        case utils_1.AST_NODE_TYPES.Identifier:
                            return node.key.name;
                        case utils_1.AST_NODE_TYPES.Literal:
                            return functions_1.cast.string(node.key.value);
                        default:
                            return this.getText(node.key);
                    }
                case utils_1.AST_NODE_TYPES.StaticBlock:
                case utils_1.AST_NODE_TYPES.TSIndexSignature:
                case utils_1.AST_NODE_TYPES.TSCallSignatureDeclaration:
                case utils_1.AST_NODE_TYPES.TSConstructSignatureDeclaration:
                    return "";
            }
        },
        getText: mixed => {
            if (functions_1.is.number(mixed))
                return code.slice(mixed);
            if (functions_1.is.array(mixed))
                return code.slice(...mixed);
            return code.slice(...mixed.range);
        },
        hasTrailingComment(node) {
            return code.slice(node.range[1]).trimStart().startsWith("//");
        },
        id,
        isAdjacentNodes: (node1, node2) => {
            if (node1.parent === node2.parent) {
                const pos = node1.range[1];
                const end = Math.min(node2.range[0], ...source.getCommentsBefore(node2).map(comment => comment.range[0]));
                if (pos <= end)
                    return ["", ","].includes(code.slice(pos, end).trim());
            }
            return false;
        },
        locZero: {
            end: source.getLocFromIndex(0),
            start: source.getLocFromIndex(0)
        },
        normalizeSource: (source2) => {
            source2 = (0, functions_1.evaluate)(() => {
                if (source2 === "@") {
                    functions_1.assert.not.empty(_package.name, "Missing package name");
                    return `${_package.name}`;
                }
                if (source2.startsWith("@/")) {
                    functions_1.assert.not.empty(_package.name, "Missing package name");
                    const path2 = `src/${source2.slice(2)}`;
                    return `${_package.name}/${path2}`;
                }
                if (source2 === "." ||
                    source2 === ".." ||
                    source2.startsWith("./") ||
                    source2.startsWith("../")) {
                    functions_1.assert.not.empty(_package.name, "Missing package name");
                    const path2 = (0, core_1.stripBase)(node_path_1.default.join(node_path_1.default.dirname(path), source2));
                    return `${_package.name}/${path2}`;
                }
                return source2;
            });
            return functions_1.s.path.canonicalize(source2);
        },
        options: getRuleOptions(ruleOptionsArray, options),
        package: (0, core_1.getPackage)(),
        path,
        rawContext: context,
        report: context.report.bind(context),
        scope: context.getScope(),
        source,
        subOptionsArray: getSubOptionsArray(ruleOptionsArray, options, path)
    };
}
exports.createBetterContext = createBetterContext;
const isSharedOptions2 = functions_1.is.object.factory({}, { _id: functions_1.is.string, filesToLint: functions_1.is.strings, filesToSkip: functions_1.is.strings });
/**
 * Gets rule options.
 *
 * @param ruleOptionsArray - Raw rule options array.
 * @param options - Options.
 * @returns Rule options.
 */
function getRuleOptions(ruleOptionsArray, options) {
    const { isOptions } = Object.assign({ isOptions: functions_1.is.unknown }, options);
    const ruleOptions = ruleOptionsArray[0];
    functions_1.assert.byGuard(ruleOptions, isOptions, "Expecting valid rule options");
    return ruleOptions;
}
/**
 * Gets suboptions array.
 *
 * @param ruleOptionsArray - Raw rule options array.
 * @param options - Options.
 * @param path - Path.
 * @returns Suboptions array.
 */
function getSubOptionsArray(ruleOptionsArray, options, path) {
    var _a;
    const { defaultSubOptions, isSubOptions, subOptionsKey } = options;
    if (isSubOptions) {
        const ruleOptions = getRuleOptions(ruleOptionsArray, options);
        functions_1.assert.not.empty(subOptionsKey, "Expecting suboptions key");
        const raw = (_a = functions_1.o.get(ruleOptions, subOptionsKey)) !== null && _a !== void 0 ? _a : [];
        functions_1.assert.array.of(raw, functions_1.is.object, "Expecting valid rule options");
        const result = raw
            .map((subOptions) => (Object.assign(Object.assign({}, defaultSubOptions), subOptions)))
            .filter(subOptions => shouldBeLinted2(subOptions, path));
        functions_1.assert.array.of(result, isSubOptions, "Expecting valid rule options");
        return result;
    }
    return [];
}
/**
 * Determines if file should be linted.
 *
 * @param options - Options.
 * @param path - Path.
 * @returns _True_ if file should be linted, _false_ otherwise.
 */
function shouldBeLinted2(options, path) {
    functions_1.assert.byGuard(options, isSharedOptions2, "Expecting valid rule options");
    const disallowByPath = (0, functions_1.evaluate)(() => {
        var _a, _b;
        const matcher = (0, core_1.createFileMatcher)({ allow: (_a = options.filesToLint) !== null && _a !== void 0 ? _a : [], disallow: (_b = options.filesToSkip) !== null && _b !== void 0 ? _b : [] }, false, { dot: true, matchBase: true });
        return matcher((0, core_1.stripBase)(functions_1.s.path.canonicalize(path), "./"));
    });
    return !disallowByPath;
}
//# sourceMappingURL=create-context.js.map