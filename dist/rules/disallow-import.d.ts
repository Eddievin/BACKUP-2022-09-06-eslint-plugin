import * as utils from "./utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { strings } from "@skylib/functions";
export interface Options {
    readonly allow: strings;
    readonly disallow: strings;
}
export interface SubOptions {
    readonly allow: strings;
    readonly disallow: strings;
}
export declare enum MessageId {
    disallowedSource = "disallowedSource"
}
export declare const disallowImport: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, [Partial<Options & utils.SharedOptions1> & {
    readonly exclusions?: readonly Partial<SubOptions & utils.SharedOptions2>[];
}], RuleListener>;
//# sourceMappingURL=disallow-import.d.ts.map