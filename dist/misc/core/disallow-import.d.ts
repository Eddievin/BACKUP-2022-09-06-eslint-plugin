import type { strings } from "@skylib/functions";
export interface Options {
    readonly allow: strings;
    readonly disallow: strings;
}
export declare enum MessageId {
    disallowedSource = "disallowedSource"
}
export declare const disallowImport: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, [Partial<Options> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
//# sourceMappingURL=disallow-import.d.ts.map