import * as utils from "./utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { strings } from "@skylib/functions";
export interface Options {
    readonly extensions: strings;
}
export declare enum MessageId {
    noSelfImport = "noSelfImport"
}
export declare const noSelfImport: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, [Partial<Options & utils.SharedOptions1> & {}], RuleListener>;
//# sourceMappingURL=no-self-import.d.ts.map