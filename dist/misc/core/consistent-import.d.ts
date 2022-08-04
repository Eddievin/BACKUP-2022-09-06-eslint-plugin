import * as utils from "../../utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { strings } from "@skylib/functions";
export interface SubOptions {
    readonly _id: string;
    readonly altLocalNames: strings;
    readonly autoImport: boolean;
    readonly autoImportSource?: string;
    readonly localName?: string;
    readonly source: string;
    readonly sourcePattern?: string;
    readonly wildcard: boolean;
}
export declare enum MessageId {
    autoImport = "autoImport",
    invalidLocalName = "invalidLocalName",
    wildcardDisallowed = "wildcardDisallowed",
    wildcardRequired = "wildcardRequired"
}
export declare const consistentImport: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, [object & {
    readonly sources?: readonly Partial<SubOptions & utils.SharedOptions2>[];
}], RuleListener>;
//# sourceMappingURL=consistent-import.d.ts.map