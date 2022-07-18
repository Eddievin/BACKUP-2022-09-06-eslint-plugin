import * as utils from "./utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
export declare enum MessageId {
    unsafeOptionalAssignment = "unsafeOptionalAssignment",
    unsafeReadonlyAssignment = "unsafeReadonlyAssignment"
}
export declare const noUnsafeObjectAssignment: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, [Partial<object & utils.SharedOptions1> & {}], RuleListener>;
//# sourceMappingURL=no-unsafe-object-assignment.d.ts.map