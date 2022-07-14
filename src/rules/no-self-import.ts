import * as utils from "./utils";
import { ReadonlySet, is } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import path from "node:path";
import type { strings } from "@skylib/functions";

export interface Options {
  readonly extensions: strings;
}

export enum MessageId {
  // eslint-disable-next-line @typescript-eslint/no-shadow -- Postponed
  noSelfImport = "noSelfImport"
}

export const noSelfImport = utils.createRule({
  name: "no-self-import",
  isOptions: is.object.factory<Options>({ extensions: is.strings }, {}),
  defaultOptions: { extensions: [".js", ".ts"] },
  messages: { [MessageId.noSelfImport]: "Self-import is not allowed" },
  create: (context): RuleListener => {
    const basenames = new ReadonlySet([
      path.basename(context.path),
      ...context.options.extensions.map(extension =>
        path.basename(context.path, extension)
      )
    ]);

    return {
      CallExpression: (node): void => {
        if (
          node.callee.type === AST_NODE_TYPES.Identifier &&
          node.callee.name === "require"
        ) {
          const source = node.arguments[0];

          if (
            is.not.empty(source) &&
            source.type === "Literal" &&
            is.string(source.value)
          )
            lintNode(source.value, source);
        }
      },
      ImportDeclaration: (node): void => {
        const source = node.source;

        lintNode(source.value, source);
      },
      ImportExpression: (node): void => {
        const source = node.source;

        if (source.type === "Literal" && is.string(source.value))
          lintNode(source.value, source);
      }
    };

    function lintNode(source: string, node: TSESTree.Node): void {
      if (path.dirname(source) === "." && basenames.has(path.basename(source)))
        context.report({ messageId: MessageId.noSelfImport, node });
    }
  }
});
