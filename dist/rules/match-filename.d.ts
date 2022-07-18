import * as utils from "./utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { strings } from "@skylib/functions";
export interface Options {
    readonly format: utils.casing.Format;
    readonly prefix: string;
    readonly selector: strings | string;
    readonly suffix: string;
}
export declare enum MessageId {
    invalidNodeText = "invalidNodeText"
}
export declare const matchFilename: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, [Partial<Options & utils.SharedOptions1> & {}], RuleListener>;
//# sourceMappingURL=match-filename.d.ts.map