"use strict";
const tslib_1 = require("tslib");
const experimental_utils_1 = require("@typescript-eslint/experimental-utils");
const assert = (0, tslib_1.__importStar)(require("@skylib/functions/dist/assertions"));
const is = (0, tslib_1.__importStar)(require("@skylib/functions/dist/guards"));
const utils = (0, tslib_1.__importStar)(require("./utils"));
const isSubOptions = is.factory(is.object.of, { allow: is.strings, disallow: is.strings }, {});
const rule = utils.createRule({
    create(context) {
        const matchers = context.subOptionsArray.map(subOptions => utils.createFileMatcher.disallowAllow(subOptions.disallow, subOptions.allow, true, { dot: true }));
        return {
            [experimental_utils_1.AST_NODE_TYPES.ImportDeclaration](node) {
                const source = node.source.value;
                assert.string(source);
                if (matchers.some(matcher => matcher(source)))
                    context.report({
                        messageId: "disallowedSource",
                        node
                    });
            }
        };
    },
    defaultSubOptions: {
        allow: [],
        disallow: []
    },
    isRuleOptions: is.object,
    isSubOptions,
    messages: {
        disallowedSource: "Import from this source is not allowed"
    }
});
module.exports = rule;
//# sourceMappingURL=disallow-import.js.map