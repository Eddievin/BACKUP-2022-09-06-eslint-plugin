import * as utils from "./utils";
import { is } from "@skylib/functions";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
export interface Options {
    readonly classes: Style;
    readonly interfaces: Style;
}
export interface SubOptions {
    readonly _id: string;
    readonly pattern?: utils.Pattern;
    readonly propertyPattern?: utils.Pattern;
    readonly style: Style;
    readonly target?: Target;
}
export declare enum MessageId {
    combined = "combined",
    combinedId = "combinedId",
    optional = "optional",
    optionalId = "optionalId",
    undefined = "undefined",
    undefinedId = "undefinedId"
}
export declare enum Target {
    classes = "classes",
    interfaces = "interfaces"
}
export declare const isTarget: is.Guard<Target>;
export declare enum Style {
    combined = "combined",
    optional = "optional",
    undefined = "undefined"
}
export declare const isStyle: is.Guard<Style>;
export declare const consistentOptionalProps: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId.combined | MessageId.optional | MessageId.optionalId | MessageId.undefined | MessageId.undefinedId | "combinedId", [Partial<Options & utils.SharedOptions1> & {
    readonly overrides?: readonly Partial<SubOptions & utils.SharedOptions2>[];
}], RuleListener>;
//# sourceMappingURL=consistent-optional-props.d.ts.map