import * as ts from "typescript";
import type { TSESTree } from "@typescript-eslint/utils";
import type * as utils from ".";
export declare type TypePart = number | string | ts.Type | undefined;
/**
 * Gets type parts.
 *
 * @param node - Node.
 * @param context - Context.
 * @returns Type parts.
 */
export declare function getTypeParts<M extends string, O extends object, S extends object>(node: TSESTree.Node, context: utils.Context<M, O, S>): readonly TypePart[];
export declare namespace getTypeParts {
    var typeofFix: typeof getTypePartsWithTypeofFix;
}
/**
 * Gets type parts.
 *
 * @param node - Node.
 * @param context - Context.
 * @returns Type parts.
 */
export declare function getTypePartsWithTypeofFix<M extends string, O extends object, S extends object>(node: TSESTree.Node, context: utils.Context<M, O, S>): readonly TypePart[];
//# sourceMappingURL=type-parts.d.ts.map