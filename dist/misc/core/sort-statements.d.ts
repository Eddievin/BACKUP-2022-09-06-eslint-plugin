import { is } from "@skylib/functions";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
export interface Options {
    readonly blockOrder: NodeTypes;
    readonly moduleOrder: NodeTypes;
    readonly order: NodeTypes;
    readonly programOrder: NodeTypes;
}
export declare enum NodeType {
    ExportAllDeclaration = "ExportAllDeclaration",
    ExportDeclaration = "ExportDeclaration",
    ExportFunctionDeclaration = "ExportFunctionDeclaration",
    ExportTypeDeclaration = "ExportTypeDeclaration",
    FunctionDeclaration = "FunctionDeclaration",
    ImportDeclaration = "ImportDeclaration",
    JestTest = "JestTest",
    TypeDeclaration = "TypeDeclaration",
    Unknown = "Unknown"
}
export declare const isNodeType: is.Guard<NodeType>;
export declare const isNodeTypes: is.Guard<readonly NodeType[]>;
export declare const sortStatements: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("../../utils/sort.internal").MessageId, [Partial<Options> & {}], RuleListener>;
declare type NodeTypes = readonly NodeType[];
export {};
//# sourceMappingURL=sort-statements.d.ts.map