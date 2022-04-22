"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disallowImport = void 0;
const tslib_1 = require("tslib");
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
const utils = tslib_1.__importStar(require("./utils"));
exports.disallowImport = utils.createRule({
    create(context) {
        const matchers = context.subOptionsArray.map(subOptions => utils.createFileMatcher.disallowAllow(subOptions.disallow, subOptions.allow, true, { dot: true }));
        return {
            [utils_1.AST_NODE_TYPES.ImportDeclaration](node) {
                const source = node.source.value;
                functions_1.assert.string(source);
                if (matchers.some(matcher => matcher(source)))
                    context.report({ messageId: "disallowedSource", node });
            }
        };
    },
    defaultSubOptions: { allow: [], disallow: [] },
    isRuleOptions: functions_1.is.object,
    isSubOptions: functions_1.is.object.factory({ allow: functions_1.is.strings, disallow: functions_1.is.strings }, {}),
    messages: { disallowedSource: "Import from this source is not allowed" },
    name: "disallow-import"
});
//# sourceMappingURL=disallow-import.js.map