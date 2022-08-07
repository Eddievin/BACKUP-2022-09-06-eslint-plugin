"use strict";
/* eslint-disable @skylib/custom/prefer-readonly-array -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapRule = exports.stripBase = exports.prepareForComparison = exports.prefixKeys = exports.nodeText = exports.mergeListenters = exports.getSelectors = exports.getPackage = exports.getIdentifierFromPath = exports.createRule = exports.createRegexpMatcher = exports.createFileMatcher = exports.selectors = exports.isSelector = exports.isPattern = exports.base = exports.isPackage = exports.isMatcherType = exports.MatcherType = void 0;
const tslib_1 = require("tslib");
const _ = tslib_1.__importStar(require("@skylib/lodash-commonjs-es"));
const utils_1 = require("@typescript-eslint/utils");
const functions_1 = require("@skylib/functions");
const TypeCheck_1 = require("./TypeCheck");
const create_context_1 = require("./create-context");
const node_fs_1 = tslib_1.__importDefault(require("node:fs"));
const minimatch_1 = tslib_1.__importDefault(require("minimatch"));
const node_path_1 = tslib_1.__importDefault(require("node:path"));
var MatcherType;
(function (MatcherType) {
    MatcherType["allowDisallow"] = "allowDisallow";
    MatcherType["disallowAllow"] = "disallowAllow";
})(MatcherType = exports.MatcherType || (exports.MatcherType = {}));
exports.isMatcherType = functions_1.is.factory(functions_1.is.enumeration, MatcherType);
exports.isPackage = functions_1.is.factory(functions_1.is.object.of, {}, { name: functions_1.is.string });
exports.base = functions_1.fn.pipe(process.cwd(), functions_1.s.path.canonicalize, functions_1.s.path.addTrailingSlash);
exports.isPattern = functions_1.is.or.factory(functions_1.is.string, functions_1.is.strings);
exports.isSelector = functions_1.is.or.factory(functions_1.is.string, functions_1.is.strings);
exports.selectors = {
    arrayType: "TSArrayType, TSTupleType",
    block: "BlockStatement, Program, SwitchCase, TSModuleBlock",
    documentedBlock: "ExportNamedDeclaration, Program, TSModuleBlock",
    function: ":function, TSDeclareFunction, TSFunctionType, TSMethodSignature",
    functionExpression: "ArrowFunctionExpression, FunctionExpression",
    method: "MethodDefinition, TSAbstractMethodDefinition",
    property: "PropertyDefinition, TSPropertySignature",
    statement: ":statement, TSDeclareFunction, TSExportAssignment"
};
/**
 * Creates file matcher.
 *
 * @param patterns - Patterns.
 * @param defVal - Default value.
 * @param options - Minimatch options.
 * @returns Matcher.
 */
function createFileMatcher(patterns, defVal, options) {
    if (functions_1.is.strings(patterns)) {
        const matchers = patterns.map(pattern => (str) => (0, minimatch_1.default)(str, pattern, options));
        return matchers.length
            ? (str) => matchers.some(matcher => matcher(str))
            : () => defVal;
    }
    const { allow, disallow } = patterns;
    const disallowMatcher = createFileMatcher(disallow, true, options);
    const allowMatcher = createFileMatcher(allow, false, options);
    return disallow.length || allow.length
        ? (str) => disallowMatcher(str) && !allowMatcher(str)
        : () => defVal;
}
exports.createFileMatcher = createFileMatcher;
/**
 * Creates matcher.
 *
 * @param pattern - RegExp pattern(s).
 * @param defVal - Default value.
 * @returns Matcher.
 */
function createRegexpMatcher(pattern, defVal) {
    if (functions_1.is.string(pattern))
        return createRegexpMatcher([pattern], defVal);
    const matchers = pattern
        // eslint-disable-next-line security/detect-non-literal-regexp -- Ok
        .map(pt => new RegExp(pt, "u"))
        .map(re => (str) => re.test(str));
    return matchers.length
        ? str => matchers.some(matcher => matcher(str))
        : () => defVal;
}
exports.createRegexpMatcher = createRegexpMatcher;
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
            const betterContext = (0, create_context_1.createBetterContext)(context, rawOptions, options);
            const typeCheck = new Proxy(new TypeCheck_1.TypeCheck(context), (0, functions_1.wrapProxyHandler)("classToInterface", functions_1.ProxyHandlerAction.doDefault, {
                get: (target, key) => {
                    // eslint-disable-next-line @skylib/custom/functions/no-reflect-get -- Postponed
                    const result2 = functions_1.reflect.get(target, key);
                    functions_1.assert.callable(result2, "Expecting function");
                    // eslint-disable-next-line no-warning-comments -- Wait for @skylib/functions update
                    // fixme
                    return result2.bind(target);
                }
            }));
            const result = create(betterContext, typeCheck);
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
 * Gets name from filename.
 *
 * @param path - Path.
 * @param expected - Expected name.
 * @returns Name.
 */
function getIdentifierFromPath(path, expected) {
    // eslint-disable-next-line @typescript-eslint/no-shadow -- Postponed
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
    const selectors2 = noDefaultSelectors
        ? includeSelectors
        : _.difference([...defaultSelectors, ...includeSelectors], excludeSelectors);
    functions_1.assert.toBeTrue(selectors2.length > 0, "Expecting at least one selector");
    return selectors2.join(", ");
}
exports.getSelectors = getSelectors;
// eslint-disable-next-line @skylib/require-jsdoc -- Postponed
function mergeListenters(...listenters) {
    const visitorsMap = new functions_1.Accumulator(listenters.flatMap(visitors => functions_1.o
        .entries(visitors)
        .map(([selector, visitor]) => [
        selector,
        [functions_1.as.callable(visitor)]
    ])));
    const entries = functions_1.a.fromIterable(visitorsMap).map(([name, visitors]) => [
        name,
        node => {
            for (const visitor of visitors)
                visitor(node);
        }
    ]);
    const result = {};
    for (const [selector, visitor] of entries)
        result[selector] = visitor;
    return result;
}
exports.mergeListenters = mergeListenters;
/**
 * Returns string representing node.
 *
 * @param node - Node.
 * @param defVal - Default value.
 * @returns String representing node.
 */
function nodeText(node, defVal) {
    switch (node.type) {
        case utils_1.AST_NODE_TYPES.Identifier:
            return node.name;
        case utils_1.AST_NODE_TYPES.Literal:
            return functions_1.cast.string(node.value);
        default:
            return functions_1.as.callable(defVal)();
    }
}
exports.nodeText = nodeText;
// eslint-disable-next-line @skylib/require-jsdoc -- Ok
function prefixKeys(obj, prefix) {
    return functions_1.o.fromEntries(functions_1.o.entries(obj).map(([key, value]) => [`${prefix}${key}`, value]));
}
exports.prefixKeys = prefixKeys;
// eslint-disable-next-line @skylib/require-jsdoc -- Postponed
function prepareForComparison(str, priority) {
    const keys = functions_1.a.fromString(priority);
    const values = functions_1.a.sort(functions_1.a.fromString(priority));
    const map = functions_1.o.fromEntries(keys.map((key, index) => [key, functions_1.a.get(values, index)]));
    // eslint-disable-next-line security/detect-non-literal-regexp -- Ok
    const re = new RegExp(`[${functions_1.s.escapeRegExpSpecialChars(priority)}]`, "gu");
    return str.replace(re, callback);
    function callback(char) {
        return map[char];
    }
}
exports.prepareForComparison = prepareForComparison;
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
// eslint-disable-next-line @skylib/require-jsdoc -- Postpone
function wrapRule(rule, options) {
    return Object.assign(Object.assign({}, rule), { create: context => {
            const combined = options.map((option, index) => {
                const override = context.options[index];
                return functions_1.is.object(option) && functions_1.is.object(override)
                    ? Object.assign(Object.assign({}, option), override) : option;
            });
            return rule.create(new Proxy({}, (0, functions_1.wrapProxyHandler)("wrap-rule", functions_1.ProxyHandlerAction.throw, {
                get: (_target, key) => 
                // eslint-disable-next-line @skylib/custom/functions/no-reflect-get -- Postponed
                key === "options" ? combined : functions_1.reflect.get(context, key)
            })));
        } });
}
exports.wrapRule = wrapRule;
//# sourceMappingURL=core.js.map