import * as utils from "./utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
export declare enum MessageId {
    missingEmptyLineAfter = "missingEmptyLineAfter",
    missingEmptyLineBefore = "missingEmptyLineBefore",
    unexpectedEmptyLineAfter = "unexpectedEmptyLineAfter"
}
export declare const emptyLinesAroundComment: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, [Partial<object & utils.SharedOptions1> & {}], RuleListener>;
//# sourceMappingURL=empty-lines-around-comment.d.ts.map