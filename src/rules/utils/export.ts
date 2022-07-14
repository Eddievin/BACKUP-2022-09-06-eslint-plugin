import * as _ from "@skylib/lodash-commonjs-es";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import type { Writable } from "@skylib/functions";
import { is } from "@skylib/functions";

// eslint-disable-next-line @skylib/require-jsdoc -- Postponed
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

// eslint-disable-next-line @skylib/require-jsdoc -- Postponed
export function create(callback: ProgramExit): RuleListener {
  const exportAllDeclarations: Writable<ExportAllDeclarations> = [];

  const exportDefaultDeclarations: Writable<ExportDefaultDeclarations> = [];

  const exportNamedDeclarations: Writable<ExportNamedDeclarations> = [];

  const identifiers: Writable<Identifiers> = [];

  return {
    [[
      "Program > ExportAllDeclaration > Identifier",
      "Program > ExportNamedDeclaration > ClassDeclaration > Identifier.id",
      "Program > ExportNamedDeclaration > ExportSpecifier > Identifier.exported",
      "Program > ExportNamedDeclaration > FunctionDeclaration > Identifier.id",
      "Program > ExportNamedDeclaration > TSInterfaceDeclaration > Identifier.id",
      "Program > ExportNamedDeclaration > TSModuleDeclaration > Identifier.id",
      "Program > ExportNamedDeclaration > TSTypeAliasDeclaration > Identifier.id",
      "Program > ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > Identifier.id"
    ].join(", ")]: (node: TSESTree.Identifier): void => {
      identifiers.push(node);
    },
    "Program > ExportAllDeclaration": (
      node: TSESTree.ExportAllDeclaration
    ): void => {
      if (is.empty(node.exported)) exportAllDeclarations.push(node);
    },
    "Program > ExportDefaultDeclaration": (
      node: TSESTree.ExportDefaultDeclaration
    ): void => {
      exportDefaultDeclarations.push(node);
    },
    "Program > ExportNamedDeclaration": (
      node: TSESTree.ExportNamedDeclaration
    ): void => {
      exportNamedDeclarations.push(node);
    },
    "Program:exit": (): void => {
      const count =
        exportAllDeclarations.filter(declaration => !declaration.exported)
          .length +
        exportDefaultDeclarations.length +
        _.uniq(identifiers.map(identifier => identifier.name)).length;

      callback({
        exportAllDeclarations,
        exportDeclarations: [
          ...exportAllDeclarations,
          ...exportDefaultDeclarations,
          ...exportNamedDeclarations
        ],
        exportDefaultDeclarations,
        exportNamedDeclarations,
        identifiers,
        onlyExport: count === 1
      });
    }
  };
}

type ExportAllDeclarations = readonly TSESTree.ExportAllDeclaration[];

type ExportDeclaration =
  | TSESTree.ExportAllDeclaration
  | TSESTree.ExportDefaultDeclaration
  | TSESTree.ExportNamedDeclaration;

type ExportDeclarations = readonly ExportDeclaration[];

type ExportDefaultDeclarations = readonly TSESTree.ExportDefaultDeclaration[];

type ExportNamedDeclarations = readonly TSESTree.ExportNamedDeclaration[];

type Identifiers = readonly TSESTree.Identifier[];
