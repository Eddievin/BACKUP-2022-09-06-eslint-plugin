import * as utils from "./utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
export interface SubOptions {
    readonly _id: string;
    readonly averageLinesGte: number;
    readonly everyLinesGte: number;
    readonly selector: string;
    readonly someHasDocComment: boolean;
    readonly someLinesGte: number;
}
export declare enum MessageId {
    expectingEmptyLine = "expectingEmptyLine",
    unexpectedEmptyLine = "unexpectedEmptyLine"
}
export declare const consistentGroupEmptyLines: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, [Partial<object & utils.SharedOptions1> & {
    readonly rules?: readonly Partial<SubOptions & utils.SharedOptions2>[];
}], RuleListener>;
//# sourceMappingURL=consistent-group-empty-lines.d.ts.map