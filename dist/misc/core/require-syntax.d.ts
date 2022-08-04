import * as utils from "../../utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
export interface Options {
    readonly message?: string;
    readonly selector: utils.Selector;
    readonly trigger: utils.Selector;
}
export declare enum MessageId {
    customMessage = "customMessage"
}
export declare const requireSyntax: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, [Partial<Options> & {}], RuleListener>;
//# sourceMappingURL=require-syntax.d.ts.map