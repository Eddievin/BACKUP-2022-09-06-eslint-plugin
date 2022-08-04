import * as utils from "../../utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
export interface Options {
    readonly checkReturnType: boolean;
    readonly message?: string;
    readonly replacement?: string;
    readonly search?: string;
    readonly selector: utils.Selector;
    readonly typeHas?: utils.TypeGroup;
    readonly typeHasNoneOf?: utils.TypeGroups;
    readonly typeHasOneOf?: utils.TypeGroups;
    readonly typeIs?: utils.TypeGroup;
    readonly typeIsNoneOf?: utils.TypeGroups;
    readonly typeIsOneOf?: utils.TypeGroups;
}
export declare enum MessageId {
    customMessage = "customMessage"
}
export declare const restrictSyntax: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, [Partial<Options> & {}], RuleListener>;
//# sourceMappingURL=restrict-syntax.d.ts.map