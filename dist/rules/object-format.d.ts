import * as utils from "./utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
export interface Options {
    readonly maxLineLength: number;
    readonly maxObjectSize: number;
}
export declare enum MessageId {
    expectingMultiline = "expectingMultiline",
    expectingSingleLine = "expectingSingleLine"
}
export declare const objectFormat: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, [Partial<Options & utils.SharedOptions1> & {}], RuleListener>;
//# sourceMappingURL=object-format.d.ts.map