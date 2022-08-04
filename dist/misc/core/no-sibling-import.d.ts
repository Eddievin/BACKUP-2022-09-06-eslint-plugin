import type { strings } from "@skylib/functions";
export interface Options {
    readonly exclusions: strings;
}
export declare enum MessageId {
    disallowedSource = "disallowedSource"
}
export declare const noSiblingImport: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, [Partial<Options> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
//# sourceMappingURL=no-sibling-import.d.ts.map