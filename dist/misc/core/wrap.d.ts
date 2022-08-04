import * as utils from "../../utils";
import type { RuleListener, RuleModule } from "@typescript-eslint/utils/dist/ts-eslint";
export interface Options {
    readonly lintSelector: utils.Selector;
    readonly plugin: string;
    readonly rule: string;
    readonly skipSelector: utils.Selector;
}
export declare enum MessageId {
    customMessage = "customMessage"
}
export declare const wrap: RuleModule<MessageId, [Partial<Options> & {}], RuleListener>;
//# sourceMappingURL=wrap.d.ts.map