import * as utils from "./utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { strings } from "@skylib/functions";
export interface Options {
    readonly checkReturnType?: boolean;
    readonly message?: string;
    readonly replacement?: string;
    readonly search?: string;
    readonly selector: strings | string;
    readonly typeHas?: utils.TypeGroup;
    readonly typeHasNoneOf?: utils.TypeGroups;
    readonly typeHasNot?: utils.TypeGroup;
    readonly typeHasOneOf?: utils.TypeGroups;
    readonly typeIs?: utils.TypeGroup;
    readonly typeIsNoneOf?: utils.TypeGroups;
    readonly typeIsNot?: utils.TypeGroup;
    readonly typeIsOneOf?: utils.TypeGroups;
}
export declare enum MessageId {
    customMessage = "customMessage"
}
export declare const custom: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, [Partial<Options & utils.SharedOptions1> & {}], RuleListener>;
//# sourceMappingURL=custom.d.ts.map