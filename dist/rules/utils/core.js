"use strict";
/* eslint-disable @skylib/custom/prefer-arrow-function-property -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripBase = exports.nodeToString = exports.isAdjacentNodes = exports.getSelectors = exports.getPackage = exports.getNodeId = exports.getIdentifierFromPath = exports.getComments = exports.createRule = exports.createMatcher = exports.buildChildNodesMap = exports.isSelector = exports.isPattern = exports.createFileMatcher = exports.base = exports.isPackage = void 0;
const tslib_1 = require("tslib");
/* eslint-disable @skylib/custom/prefer-readonly-array -- Ok */
const _ = tslib_1.__importStar(require("@skylib/lodash-commonjs-es"));
const tsutils = tslib_1.__importStar(require("tsutils"));
const utils_1 = require("@typescript-eslint/utils");
const functions_1 = require("@skylib/functions");
const TypeCheck_1 = require("./TypeCheck");
const node_fs_1 = tslib_1.__importDefault(require("node:fs"));
const minimatch_1 = tslib_1.__importDefault(require("minimatch"));
const node_path_1 = tslib_1.__importDefault(require("node:path"));
exports.isPackage = functions_1.is.factory(functions_1.is.object.of, {}, { name: functions_1.is.string });
exports.base = functions_1.fn.pipe(process.cwd(), functions_1.s.path.canonicalize, functions_1.s.path.addTrailingSlash);
exports.createFileMatcher = (0, functions_1.defineFn)(
/**
 * Creates file matcher.
 *
 * @param patterns - Patterns.
 * @param defVal - Default value.
 * @param options - Minimatch options.
 * @returns Matcher.
 */
(patterns, defVal, options) => {
    const matchers = patterns.map(pattern => (str) => (0, minimatch_1.default)(str, pattern, options));
    // eslint-disable-next-line no-warning-comments -- Postponed
    // fixme
    return (0, functions_1.evaluate)(() => matchers.length
        ? (str) => matchers.some(matcher => matcher(str))
        : () => defVal);
}, {
    /**
     * Creates file matcher.
     *
     * @param disallow - Disallow patterns.
     * @param allow - Allow patterns.
     * @param defVal - Default value.
     * @param options - Minimatch options.
     * @returns Matcher.
     */
    disallowAllow: (disallow, allow, defVal, options) => {
        if (disallow.length || allow.length) {
            const disallowMatcher = (0, exports.createFileMatcher)(disallow, true, options);
            const allowMatcher = (0, exports.createFileMatcher)(allow, false, options);
            return (str) => disallowMatcher(str) && !allowMatcher(str);
        }
        return () => defVal;
    }
});
exports.isPattern = functions_1.is.or.factory(functions_1.is.string, functions_1.is.strings);
exports.isSelector = functions_1.is.or.factory(functions_1.is.string, functions_1.is.strings);
/**
 * Adds node to child nodes map.
 *
 * @param node - Node.
 * @param mutableChildNodesMap - Child nodes map.
 */
function buildChildNodesMap(node, mutableChildNodesMap) {
    mutableChildNodesMap.push(getNodeId(node.parent), node);
}
exports.buildChildNodesMap = buildChildNodesMap;
/**
 * Creates matcher.
 *
 * @param mixedPattern - RegExp pattern(s).
 * @param defVal - Default value.
 * @returns Matcher.
 */
function createMatcher(mixedPattern, defVal) {
    if (functions_1.is.not.empty(mixedPattern)) {
        const matchers = functions_1.a
            .fromMixed(mixedPattern)
            // eslint-disable-next-line security/detect-non-literal-regexp -- Ok
            .map(pattern => new RegExp(pattern, "u"))
            .map(re => (str) => re.test(str));
        return str => matchers.some(matcher => matcher(str));
    }
    return () => defVal;
}
exports.createMatcher = createMatcher;
/**
 * Creates rule listenter.
 *
 * @param options - Options.
 * @returns Rule listenter.
 */
function createRule(options) {
    const { create, defaultOptions, fixable, messages, vue } = Object.assign({ vue: false }, options);
    const ruleCreator = utils_1.ESLintUtils.RuleCreator((name) => `https://ilyub.github.io/eslint-plugin/${name}.html`);
    return ruleCreator({
        create: (context, rawOptions) => {
            const betterContext = createBetterContext(context, rawOptions, options);
            const result = shouldBeLinted1(betterContext.options, betterContext.path)
                ? create(betterContext)
                : {};
            if (vue && functions_1.is.not.empty(context.parserServices)) {
                const defineTemplateBodyVisitor = functions_1.o.get(context.parserServices, "defineTemplateBodyVisitor");
                if (functions_1.is.callable(defineTemplateBodyVisitor))
                    return defineTemplateBodyVisitor(result, result);
            }
            return result;
        },
        defaultOptions: [defaultOptions !== null && defaultOptions !== void 0 ? defaultOptions : {}],
        meta: Object.assign({ docs: {
                description: "Rule",
                recommended: false,
                requiresTypeChecking: true
            }, messages, schema: [{}], type: "suggestion" }, (functions_1.is.not.empty(fixable) ? { fixable } : {})),
        name: options.name
    });
}
exports.createRule = createRule;
/**
 * Gets program comments.
 *
 * @param program - Program.
 * @returns Comments.
 */
function getComments(program) {
    return functions_1.cast.not.empty(program.comments, []);
}
exports.getComments = getComments;
/**
 * Gets name from filename.
 *
 * @param path - Path.
 * @param expected - Expected name.
 * @returns Name.
 */
function getIdentifierFromPath(path, expected) {
    // eslint-disable-next-line @typescript-eslint/no-shadow -- Ok
    const { base, dir, name } = node_path_1.default.parse(path);
    return functions_1.is.not.empty(expected) &&
        base.split(".").some(part => getName(part) === expected)
        ? expected
        : getName(name === "index" ? node_path_1.default.parse(dir).name : name);
    function getName(x) {
        x = functions_1.a.first(x.split("."));
        // eslint-disable-next-line no-warning-comments -- Postponed
        // fixme
        return /^[A-Z]/u.test(x) ? functions_1.s.ucFirst(_.camelCase(x)) : _.camelCase(x);
    }
}
exports.getIdentifierFromPath = getIdentifierFromPath;
/**
 * Generates node ID.
 *
 * @param node - Node.
 * @returns Node ID.
 */
function getNodeId(node) {
    return node ? `${node.type}-${node.range[0]}-${node.range[1]}` : ".";
}
exports.getNodeId = getNodeId;
/**
 * Parses package file.
 *
 * @param path - Path.
 * @returns Package file data.
 */
function getPackage(path = "package.json") {
    if (node_fs_1.default.existsSync(path)) {
        const result = functions_1.json.decode(node_fs_1.default.readFileSync(path).toString());
        if ((0, exports.isPackage)(result))
            return result;
    }
    return {};
}
exports.getPackage = getPackage;
/**
 * Gets selectors as a string.
 *
 * @param options - Options.
 * @param defaultSelectors - Default selectors.
 * @returns Selectors as a string.
 */
function getSelectors(options, defaultSelectors) {
    const { excludeSelectors, includeSelectors, noDefaultSelectors } = options;
    const selectors = noDefaultSelectors
        ? includeSelectors
        : _.difference([...defaultSelectors, ...includeSelectors], excludeSelectors);
    functions_1.assert.toBeTrue(selectors.length > 0, "Expecting at least one selector");
    return selectors.join(", ");
}
exports.getSelectors = getSelectors;
/**
 * Checks if two nodes are adjacent.
 *
 * @param node1 - Node 1.
 * @param node2 - Node 2.
 * @param childNodesMap - Child nodes map.
 * @returns _True_ if two nodes are adjacent, _false_ otherwise.
 */
function isAdjacentNodes(node1, node2, childNodesMap) {
    const id1 = getNodeId(node1.parent);
    const id2 = getNodeId(node2.parent);
    if (id1 === id2) {
        const siblings = childNodesMap.get(id1);
        const index1 = siblings.indexOf(node1);
        const index2 = siblings.indexOf(node2);
        return index1 !== -1 && index2 !== -1 && index2 - index1 === 1;
    }
    return false;
}
exports.isAdjacentNodes = isAdjacentNodes;
/**
 * Returns string representing node.
 *
 * @param node - Node.
 * @param context - Context.
 * @returns String representing node.
 */
function nodeToString(node, context) {
    switch (node.type) {
        case "Identifier":
            return node.name;
        case "Literal":
            return functions_1.cast.string(node.value);
        default:
            return `\u0000${context.getText(node)}`;
    }
}
exports.nodeToString = nodeToString;
/**
 * Strips base path.
 *
 * @param path - Path.
 * @param replacement - Replacement.
 * @returns Stripped path.
 */
function stripBase(path, replacement = "") {
    functions_1.assert.toBeTrue(functions_1.s.path.canonicalize(path).startsWith(exports.base), `Expecting path to be inside project folder: ${path}`);
    return `${replacement}${path.slice(exports.base.length)}`;
}
exports.stripBase = stripBase;
const isSharedOptions1 = functions_1.is.object.factory({}, { filesToLint: functions_1.is.strings, filesToSkip: functions_1.is.strings });
const isSharedOptions2 = functions_1.is.object.factory({}, {
    _id: functions_1.is.string,
    filesToLint: functions_1.is.strings,
    filesToSkip: functions_1.is.strings
});
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
    const parser = utils_1.ESLintUtils.getParserServices(context);
    functions_1.assert.toBeTrue(tsutils.isStrictCompilerOptionEnabled(parser.program.getCompilerOptions(), "strictNullChecks"), 'Expecting "strictNullChecks" compiler option to be enabled');
    const checker = parser.program.getTypeChecker();
    const toEsNode = parser.tsNodeToESTreeNodeMap.get.bind(parser.tsNodeToESTreeNodeMap);
    const toTsNode = parser.esTreeNodeToTSNodeMap.get.bind(parser.esTreeNodeToTSNodeMap);
    return {
        checker: parser.program.getTypeChecker(),
        code,
        defineTemplateBodyVisitor: (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Ok
        templateVisitor, 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Ok
        scriptVisitor
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Ok
        ) => {
            functions_1.assert.not.empty(context.parserServices, "Missing Vue parser");
            const defineTemplateBodyVisitor = functions_1.o.get(context.parserServices, "defineTemplateBodyVisitor");
            functions_1.assert.callable(defineTemplateBodyVisitor, "Missing Vue parser");
            return defineTemplateBodyVisitor(templateVisitor, scriptVisitor);
        },
        eol: functions_1.s.detectEol(code),
        getLeadingTrivia(node) {
            // May be undefined inside Vue <template>
            const tsNode = (0, functions_1.typedef)(this.toTsNode(node));
            return tsNode
                ? code.slice(node.range[0] - tsNode.getLeadingTriviaWidth(), node.range[0])
                : code.slice(node.range[0], node.range[0]);
        },
        getLocFromRange(range) {
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
        getRangeWithLeadingTrivia(node) {
            return [
                node.range[0] - this.getLeadingTrivia(node).length,
                node.range[1]
            ];
        },
        getText(node) {
            return code.slice(...node.range);
        },
        getTextWithLeadingTrivia(node) {
            return code.slice(node.range[0] - this.getLeadingTrivia(node).length, node.range[1]);
        },
        hasLeadingDocComment(node) {
            return this.getLeadingTrivia(node).trim().startsWith("/**");
        },
        hasTrailingComment(node) {
            return code.slice(node.range[1]).trim().startsWith("//");
        },
        id,
        locZero: {
            end: source.getLocFromIndex(0),
            start: source.getLocFromIndex(0)
        },
        missingDocComment(mixed) {
            return mixed.getDocumentationComment(this.checker).length === 0;
        },
        options: getRuleOptions(ruleOptionsArray, options),
        package: getPackage(),
        path,
        report: context.report.bind(context),
        scope: context.getScope(),
        source,
        subOptionsArray: getSubOptionsArray(ruleOptionsArray, options, path),
        toEsNode,
        toTsNode,
        typeCheck: new TypeCheck_1.TypeCheck(checker, toTsNode)
    };
}
/**
 * Gets rule options.
 *
 * @param ruleOptionsArray - Raw rule options array.
 * @param options - Options.
 * @returns Rule options.
 */
function getRuleOptions(ruleOptionsArray, options) {
    const { isOptions } = Object.assign({ 
        // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
        isOptions: functions_1.is.unknown }, options);
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
function shouldBeLinted1(options, path) {
    functions_1.assert.byGuard(options, isSharedOptions1, "Expecting valid rule options");
    const disallowByPath = (0, functions_1.evaluate)(() => {
        var _a, _b;
        const matcher = exports.createFileMatcher.disallowAllow((_a = options.filesToSkip) !== null && _a !== void 0 ? _a : [], (_b = options.filesToLint) !== null && _b !== void 0 ? _b : [], false, { dot: true, matchBase: true });
        return matcher(stripBase(functions_1.s.path.canonicalize(path), "./"));
    });
    return !disallowByPath;
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
        const matcher = exports.createFileMatcher.disallowAllow((_a = options.filesToSkip) !== null && _a !== void 0 ? _a : [], (_b = options.filesToLint) !== null && _b !== void 0 ? _b : [], false, { dot: true, matchBase: true });
        return matcher(stripBase(functions_1.s.path.canonicalize(path), "./"));
    });
    return !disallowByPath;
}
//# sourceMappingURL=core.js.map