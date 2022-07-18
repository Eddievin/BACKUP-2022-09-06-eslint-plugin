import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
export interface ProgramExit {
    (context: ProgramExitContext): void;
}
export interface ProgramExitContext {
    readonly exportAllDeclarations: ExportAllDeclarations;
    readonly exportDeclarations: ExportDeclarations;
    readonly exportDefaultDeclarations: ExportDefaultDeclarations;
    readonly exportNamedDeclarations: ExportNamedDeclarations;
    readonly identifiers: Identifiers;
    readonly onlyExport: boolean;
}
export declare function create(callback: ProgramExit): RuleListener;
declare type ExportAllDeclarations = readonly TSESTree.ExportAllDeclaration[];
declare type ExportDeclaration = TSESTree.ExportAllDeclaration | TSESTree.ExportDefaultDeclaration | TSESTree.ExportNamedDeclaration;
declare type ExportDeclarations = readonly ExportDeclaration[];
declare type ExportDefaultDeclarations = readonly TSESTree.ExportDefaultDeclaration[];
declare type ExportNamedDeclarations = readonly TSESTree.ExportNamedDeclaration[];
declare type Identifiers = readonly TSESTree.Identifier[];
export {};
//# sourceMappingURL=export.d.ts.map