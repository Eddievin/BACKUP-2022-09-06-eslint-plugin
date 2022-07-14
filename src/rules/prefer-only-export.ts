/* eslint-disable @skylib/custom/prefer-readonly-array -- Postponed */

import * as utils from "./utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import { is } from "@skylib/functions";
import type { stringU } from "@skylib/functions";

export enum MessageId {
  exportNotAllowed = "exportNotAllowed"
}

export const preferOnlyExport = utils.createRule({
  name: "prefer-only-export",
  messages: {
    [MessageId.exportNotAllowed]: "Export except class is not allowed"
  },
  create: (context): RuleListener => {
    const exportAllDeclarations: TSESTree.ExportAllDeclaration[] = [];

    const exportDefaultDeclaration: TSESTree.ExportDefaultDeclaration[] = [];

    const identifiers: TSESTree.Identifier[] = [];

    let className: stringU;

    return {
      "Program > ExportAllDeclaration": (
        node: TSESTree.ExportAllDeclaration
      ): void => {
        if (is.empty(node.exported)) exportAllDeclarations.push(node);
      },
      "Program > ExportAllDeclaration > Identifier": (
        node: TSESTree.Identifier
      ): void => {
        identifiers.push(node);
      },
      "Program > ExportDefaultDeclaration": (
        node: TSESTree.ExportDefaultDeclaration
      ): void => {
        if (node.declaration.type === "ClassDeclaration" && node.declaration.id)
          className = node.declaration.id.name;
        else exportDefaultDeclaration.push(node);
      },
      "Program > ExportNamedDeclaration > ClassDeclaration > Identifier.id": (
        node: TSESTree.Identifier
      ): void => {
        className = node.name;
      },
      "Program > ExportNamedDeclaration > ExportSpecifier > Identifier.exported":
        (node: TSESTree.Identifier): void => {
          identifiers.push(node);
        },
      "Program > ExportNamedDeclaration > FunctionDeclaration > Identifier.id":
        (node: TSESTree.Identifier): void => {
          identifiers.push(node);
        },
      "Program > ExportNamedDeclaration > TSInterfaceDeclaration > Identifier.id":
        (node: TSESTree.Identifier): void => {
          identifiers.push(node);
        },
      "Program > ExportNamedDeclaration > TSModuleDeclaration > Identifier.id":
        (node: TSESTree.Identifier): void => {
          identifiers.push(node);
        },
      "Program > ExportNamedDeclaration > TSTypeAliasDeclaration > Identifier.id":
        (node: TSESTree.Identifier): void => {
          identifiers.push(node);
        },
      "Program > ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > Identifier.id":
        (node: TSESTree.Identifier): void => {
          identifiers.push(node);
        },
      "Program:exit": (): void => {
        if (is.not.empty(className)) {
          const nodes = [
            ...exportAllDeclarations,
            ...exportDefaultDeclaration,
            ...identifiers.filter(node => node.name !== className)
          ] as const;

          if (nodes.length)
            for (const node of nodes)
              context.report({ messageId: MessageId.exportNotAllowed, node });
        }
      }
    };
  }
});