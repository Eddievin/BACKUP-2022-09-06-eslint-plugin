import * as utils from "../../utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
export interface Options {
    readonly format: utils.casing.Format;
    readonly prefix: string;
    readonly selector: utils.Selector;
    readonly suffix: string;
}
export declare enum MessageId {
    invalidText = "invalidText"
}
export declare const matchFilename: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, [Partial<Options> & {}], RuleListener>;
//# sourceMappingURL=match-filename.d.ts.map