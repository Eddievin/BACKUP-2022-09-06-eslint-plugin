import * as utils from "../../utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { strings } from "@skylib/functions";
export interface Options {
    readonly customOrder?: strings;
    readonly key?: string;
    readonly selector: utils.Selector;
    readonly sendToBottom?: string;
    readonly sendToTop?: string;
}
export declare enum MessageId {
    expectingArray = "expectingArray"
}
export declare const sortArray: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("../../utils/sort.internal").MessageId | MessageId, [Partial<Options> & {}], RuleListener>;
//# sourceMappingURL=sort-array.d.ts.map