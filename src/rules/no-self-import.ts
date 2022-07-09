import * as utils from "./utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import { is } from "@skylib/functions";
import path from "node:path";
import type { strings } from "@skylib/functions";

export const noSelfImport = utils.createRule({
  name: "no-self-import",
  isOptions: is.object.factory<RuleOptions>({ extensions: is.strings }, {}),
  defaultOptions: { extensions: [".js", ".ts"] },
  messages: { selfImportDisallowed: "Self-import is not allowed" },
  create: (context): RuleListener => {
    const expected = [
      path.basename(context.path),
      ...context.options.extensions.map(extension =>
        path.basename(context.path, extension)
      )
    ] as const;

    return {
      [AST_NODE_TYPES.CallExpression]: (node): void => {
        if (
          node.callee.type === AST_NODE_TYPES.Identifier &&
          node.callee.name === "require"
        ) {
          const source = node.arguments[0];

          if (
            is.not.empty(source) &&
            source.type === AST_NODE_TYPES.Literal &&
            is.string(source.value)
          )
            lintNode(source.value, source);
        }
      },
      [AST_NODE_TYPES.ImportDeclaration]: (node): void => {
        const source = node.source;

        lintNode(source.value, source);
      },
      [AST_NODE_TYPES.ImportExpression]: (node): void => {
        const source = node.source;

        if (source.type === AST_NODE_TYPES.Literal && is.string(source.value))
          lintNode(source.value, source);
      }
    };

    function lintNode(source: string, node: TSESTree.Node): void {
      const dir = path.dirname(source);

      const basename = path.basename(source);

      if (dir === "." && expected.includes(basename))
        context.report({ messageId: "selfImportDisallowed", node });
    }
  }
});

interface RuleOptions {
  readonly extensions: strings;
}
