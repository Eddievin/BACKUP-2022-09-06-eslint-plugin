import * as utils from "../../utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
export interface Options {
    readonly exportMatchingFilename: boolean;
    readonly selector: utils.Selector;
}
export declare enum MessageId {
    invalidExport = "invalidExport"
}
export declare const preferOnlyExport: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, import("../../utils/create-rule.internal").PartialOptionsArray<Options, object, never>, RuleListener>;
//# sourceMappingURL=prefer-only-export.d.ts.map