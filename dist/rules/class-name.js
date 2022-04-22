"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.className = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const functions_1 = require("@skylib/functions");
const utils = tslib_1.__importStar(require("./utils"));
exports.className = utils.createRule({
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
    isRuleOptions: functions_1.is.object,
    messages: { invalidClassName: "Class name should match file name" },
    name: "class-name"
});
//# sourceMappingURL=class-name.js.map