"use strict";
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const is = tslib_1.__importStar(require("@skylib/functions/dist/guards"));
const utils = tslib_1.__importStar(require("./utils"));
const rule = utils.createRule({
    create(context) {
        return {
            "ExportNamedDeclaration > ClassDeclaration"(node) {
                if (node.id)
                    if (node.id.name === path_1.default.parse(context.path).name) {
                        // Valid
                    }
                    else
                        context.report({ messageId: "invalidClassName", node });
            }
        };
    },
    isRuleOptions: is.object,
    messages: { invalidClassName: "Class name should match file name" },
    name: "class-name"
});
module.exports = rule;
//# sourceMappingURL=class-name.js.map