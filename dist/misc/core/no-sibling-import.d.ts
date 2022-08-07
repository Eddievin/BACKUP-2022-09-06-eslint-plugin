import * as utils from "../../utils";
import { is } from "@skylib/functions";
import type { strings } from "@skylib/functions";
export interface SubOptions {
    readonly allow: boolean;
    readonly levels: stringsArray;
}
export declare type stringsArray = readonly strings[];
export declare enum MessageId {
    disallowedSource = "disallowedSource"
}
export declare const isStringsArray: is.Guard<readonly (readonly string[])[]>;
export declare const isSubOptions: is.Guard<SubOptions>;
export declare const noSiblingImport: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, [object & {
    readonly folders?: readonly Partial<SubOptions & utils.SharedOptions2>[];
}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
//# sourceMappingURL=no-sibling-import.d.ts.map