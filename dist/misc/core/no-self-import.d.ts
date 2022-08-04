import type { strings } from "@skylib/functions";
export interface Options {
    readonly extensions: strings;
}
export declare enum MessageId {
    noSelfImport = "noSelfImport"
}
export declare const noSelfImport: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, [Partial<Options> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
//# sourceMappingURL=no-self-import.d.ts.map