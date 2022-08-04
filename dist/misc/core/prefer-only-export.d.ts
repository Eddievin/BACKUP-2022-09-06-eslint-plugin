import * as utils from "../../utils";
export interface Options {
    readonly exportMatchingFilename: boolean;
    readonly selector: utils.Selector;
}
export declare enum MessageId {
    invalidExport = "invalidExport"
}
export declare const preferOnlyExport: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, [Partial<Options> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
//# sourceMappingURL=prefer-only-export.d.ts.map