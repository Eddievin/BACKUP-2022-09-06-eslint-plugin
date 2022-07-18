import * as utils from "./utils";
import { is } from "@skylib/functions";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
export interface Options {
    readonly blockOrder: NodeTypes;
    readonly moduleOrder: NodeTypes;
    readonly order: NodeTypes;
    readonly rootOrder: NodeTypes;
}
export declare enum NodeType {
    ExportAllDeclaration = "ExportAllDeclaration",
    ExportDeclaration = "ExportDeclaration",
    ExportDefaultDeclaration = "ExportDefaultDeclaration",
    ExportFunctionDeclaration = "ExportFunctionDeclaration",
    ExportModuleDeclaration = "ExportModuleDeclaration",
    ExportTypeDeclaration = "ExportTypeDeclaration",
    ExportUnknown = "ExportUnknown",
    FunctionDeclaration = "FunctionDeclaration",
    GlobalModuleDeclaration = "GlobalModuleDeclaration",
    ImportDeclaration = "ImportDeclaration",
    JestTest = "JestTest",
    ModuleDeclaration = "ModuleDeclaration",
    TypeDeclaration = "TypeDeclaration",
    Unknown = "Unknown"
}
export declare const isNodeType: is.Guard<NodeType>;
export declare const isNodeTypes: is.Guard<readonly NodeType[]>;
export declare enum MessageId {
    incorrectStatementsOrder = "incorrectStatementsOrder"
}
export declare const statementsOrder: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, [Partial<Options & utils.SharedOptions1> & {}], RuleListener>;
declare type NodeTypes = readonly NodeType[];
export {};
//# sourceMappingURL=statements-order.d.ts.map