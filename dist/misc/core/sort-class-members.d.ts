import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { strings } from "@skylib/functions";
export interface Options {
    readonly sortingOrder: strings;
}
export declare const sortClassMembers: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("../../utils/sort.internal").MessageId, [Partial<Options> & {}], RuleListener>;
//# sourceMappingURL=sort-class-members.d.ts.map