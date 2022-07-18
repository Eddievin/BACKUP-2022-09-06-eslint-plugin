import * as utils from "./utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import { is } from "@skylib/functions";
import type { strings } from "@skylib/functions";
export interface Options {
    readonly excludeSelectors: strings;
    readonly includeSelectors: strings;
    readonly interfaces: readonly InterfaceOption[];
    readonly noDefaultSelectors: boolean;
    readonly properties: readonly PropertyOption[];
}
export declare enum PropertyOption {
    function = "function",
    nonFunction = "nonFunction"
}
export declare const isPropertyOption: is.Guard<PropertyOption>;
export declare const isPropertyOptions: is.Guard<readonly PropertyOption[]>;
export declare enum InterfaceOption {
    callSignatures = "callSignatures",
    constructSignatures = "constructSignatures",
    interface = "interface"
}
export declare const isInterfaceOption: is.Guard<InterfaceOption>;
export declare const isInterfaceOptions: is.Guard<readonly InterfaceOption[]>;
export declare enum MessageId {
    undocumented = "undocumented",
    undocumentedCallSignature = "undocumentedCallSignature",
    undocumentedConstructSignature = "undocumentedConstructSignature"
}
export declare const requireJsdoc: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, [Partial<Options & utils.SharedOptions1> & {}], RuleListener>;
//# sourceMappingURL=require-jsdoc.d.ts.map