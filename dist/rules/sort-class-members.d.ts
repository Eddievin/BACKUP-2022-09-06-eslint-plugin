import * as utils from "./utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { strings } from "@skylib/functions";
export interface Options {
    readonly sortingOrder: strings;
}
export declare enum MessageId {
    incorrectSortingOrder = "incorrectSortingOrder"
}
export declare const sortClassMembers: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, [Partial<Options & utils.SharedOptions1> & {}], RuleListener>;
//# sourceMappingURL=sort-class-members.d.ts.map