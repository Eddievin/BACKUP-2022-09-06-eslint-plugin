import * as utils from "./utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import { is } from "@skylib/functions";
import type { strings } from "@skylib/functions";
export interface SubOptions {
    readonly _id: string;
    readonly altLocalNames: strings;
    readonly autoImport?: boolean;
    readonly autoImportSource?: string;
    readonly localName?: string;
    readonly source: string;
    readonly sourcePattern?: string;
    readonly type: Type;
}
export declare enum MessageId {
    autoImport = "autoImport",
    invalidLocalName = "invalidLocalName",
    missingImport = "missingImport",
    wildcardImportDisallowed = "wildcardImportDisallowed",
    wildcardImportRequired = "wildcardImportRequired"
}
export declare enum Type {
    default = "default",
    wildcard = "wildcard"
}
export declare const isType: is.Guard<Type>;
export declare const consistentImport: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, [Partial<object & utils.SharedOptions1> & {
    readonly sources?: readonly Partial<SubOptions & utils.SharedOptions2>[];
}], RuleListener>;
//# sourceMappingURL=consistent-import.d.ts.map