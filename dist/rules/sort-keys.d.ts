import * as utils from "./utils";
import type { strings } from "@skylib/functions";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
export interface SubOptions {
    readonly _id: string;
    readonly customOrder?: strings;
    readonly selector: utils.Selector;
    readonly sendToBottom?: string;
    readonly sendToTop?: string;
}
export declare enum MessageId {
    expectingObject = "expectingObject"
}
export declare const sortKeys: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./utils/sort.internal").MessageId | MessageId, [Partial<object & utils.SharedOptions1> & {
    readonly overrides?: readonly Partial<SubOptions & utils.SharedOptions2>[];
}], RuleListener>;
//# sourceMappingURL=sort-keys.d.ts.map