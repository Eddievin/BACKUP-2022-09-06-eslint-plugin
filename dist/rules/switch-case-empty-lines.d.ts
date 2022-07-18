import * as utils from "./utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
export declare enum MessageId {
    addEmptyLine = "addEmptyLine",
    removeEmptyLine = "removeEmptyLine"
}
export declare const switchCaseEmptyLines: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, [Partial<object & utils.SharedOptions1> & {}], RuleListener>;
//# sourceMappingURL=switch-case-empty-lines.d.ts.map