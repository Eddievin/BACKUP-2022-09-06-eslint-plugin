import * as utils from "./utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
export interface Options {
    readonly format: utils.casing.Format;
}
export interface SubOptions {
    readonly _id: string;
    readonly format?: utils.casing.Format;
    readonly match?: boolean;
    readonly selector: string;
}
export declare enum MessageId {
    invalidFilename = "invalidFilename",
    invalidFilenameId = "invalidFilenameId"
}
export declare const consistentFilename: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, [Partial<Options & utils.SharedOptions1> & {
    readonly overrides?: readonly Partial<SubOptions & utils.SharedOptions2>[];
}], RuleListener>;
//# sourceMappingURL=consistent-filename.d.ts.map