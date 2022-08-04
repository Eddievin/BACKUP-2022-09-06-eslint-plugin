import * as utils from "../../utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import { is } from "@skylib/functions";
export interface SubOptions {
    readonly _id: string;
    readonly emptyLine: EmptyLine;
    readonly next: utils.Selector;
    readonly prev: utils.Selector;
}
export declare enum EmptyLine {
    always = "always",
    any = "any",
    never = "never"
}
export declare const isEmptyLine: is.Guard<EmptyLine>;
export declare enum MessageId {
    addEmptyLine = "addEmptyLine",
    removeEmptyLine = "removeEmptyLine"
}
export declare const consistentEmptyLines: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, [object & {
    readonly rules?: readonly Partial<SubOptions & utils.SharedOptions2>[];
}], RuleListener>;
//# sourceMappingURL=consistent-empty-lines.d.ts.map