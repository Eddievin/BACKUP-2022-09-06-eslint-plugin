import type { Context } from "./types";
import { MessageId } from "./sort.internal";
import type { TSESTree } from "@typescript-eslint/utils";
export declare const sort: (<T extends TSESTree.Node>(nodes: readonly T[], keyNode: (node: T) => TSESTree.Node, options: sort.Options, context: Context<MessageId, object, object>) => void) & Readonly<{
    MessageId: typeof MessageId;
}>;
export declare namespace sort {
    type MessageId = import("./sort.internal").MessageId;
    type Options = import("./sort.internal").Options;
}
//# sourceMappingURL=sort.d.ts.map