import * as utils from "./utils";
import { is } from "@skylib/functions";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
export interface SubOptions {
    readonly _id: string;
    readonly emptyLine: EmptyLine;
    readonly next: string;
    readonly prev: string;
}
export declare enum EmptyLine {
    always = "always",
    any = "any",
    never = "never"
}
export declare const isEmptyLine: is.Guard<EmptyLine>;
export declare enum MessageId {
    expectingEmptyLine = "expectingEmptyLine",
    unexpectedEmptyLine = "unexpectedEmptyLine"
}
export declare const consistentEmptyLines: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, [Partial<object & utils.SharedOptions1> & {
    readonly rules?: readonly Partial<SubOptions & utils.SharedOptions2>[];
}], RuleListener>;
//# sourceMappingURL=consistent-empty-lines.d.ts.map