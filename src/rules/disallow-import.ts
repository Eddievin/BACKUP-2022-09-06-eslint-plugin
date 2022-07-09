import * as utils from "./utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import { is } from "@skylib/functions";
import type { strings } from "@skylib/functions";

export const disallowImport = utils.createRule({
  create: (context): RuleListener => {
    const matcher = utils.createFileMatcher.disallowAllow(
      [
        context.options.disallow,
        ...context.subOptionsArray
          .map(subOptions => subOptions.disallow)
          .filter(is.not.empty)
      ].flat(),
      [
        context.options.allow,
        ...context.subOptionsArray
          .map(subOptions => subOptions.allow)
          .filter(is.not.empty)
      ].flat(),
      true,
      { dot: true }
    );

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
      [AST_NODE_TYPES.ExportAllDeclaration]: (node): void => {
        const source = node.source;

        lintNode(source.value, source);
      },
      [AST_NODE_TYPES.ExportNamedDeclaration]: (node): void => {
        const source = node.source;

        if (source) lintNode(source.value, source);
      },
      [AST_NODE_TYPES.ImportExpression]: (node): void => {
        const source = node.source;

        if (source.type === AST_NODE_TYPES.Literal && is.string(source.value))
          lintNode(source.value, source);
      }
    };

    function lintNode(source: string, node: TSESTree.Node): void {
      if (matcher(source))
        context.report({ messageId: "disallowedSource", node });
    }
  },
  defaultOptions: { allow: [], disallow: [] },
  isRuleOptions: is.object.factory<RuleOptions>(
    { allow: is.strings, disallow: is.strings },
    {}
  ),
  isSubOptions: is.object.factory<SubOptions>(
    {},
    { allow: is.strings, disallow: is.strings }
  ),
  messages: { disallowedSource: "Import from this source is not allowed" },
  name: "disallow-import",
  subOptionsKey: "exclusions"
});

interface RuleOptions {
  readonly allow: strings;
  readonly disallow: strings;
}

interface SubOptions {
  readonly allow?: strings;
  readonly disallow?: strings;
}
