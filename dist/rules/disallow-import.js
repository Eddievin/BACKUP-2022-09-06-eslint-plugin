"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disallowImport = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
exports.disallowImport = utils.createRule({
    create: context => {
        const matcher = utils.createFileMatcher.disallowAllow(context.options.disallow, context.options.allow, true, { dot: true });
        return {
            [utils_1.AST_NODE_TYPES.ImportDeclaration]: (node) => {
                const source = functions_1.as.string(node.source.value);
                if (matcher(source))
                    context.report({ messageId: "disallowedSource", node });
            }
        };
    },
    defaultOptions: { allow: [], disallow: [] },
    isRuleOptions: functions_1.is.object.factory({ allow: functions_1.is.strings, disallow: functions_1.is.strings }, {}),
    messages: { disallowedSource: "Import from this source is not allowed" },
    name: "disallow-import"
});
//# sourceMappingURL=disallow-import.js.map