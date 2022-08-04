import type { stringU, strings } from "@skylib/functions";
import type { Context } from "./types";
import { MessageId } from "./sort.internal";
import type { TSESTree } from "@typescript-eslint/utils";
export declare const sort: (<T extends TSESTree.Node = TSESTree.Node>(nodes: readonly T[], context: Context<MessageId, object, object>, options: sort.Options<T>) => void) & Readonly<{
    MessageId: typeof MessageId;
    messages: {
        incorrectSortingOrder: string;
        incorrectSortingOrderId: string;
    };
}>;
export declare namespace sort {
    type MessageId = import("./sort.internal").MessageId;
    interface Options<T extends TSESTree.Node = TSESTree.Node> {
        readonly _id?: string;
        readonly customOrder?: strings;
        readonly keyNode?: (node: T) => TSESTree.Node | undefined;
        readonly sendToBottom?: string;
        readonly sendToTop?: string;
        readonly sortingOrder?: (node: T) => stringU;
    }
}
//# sourceMappingURL=sort.d.ts.map