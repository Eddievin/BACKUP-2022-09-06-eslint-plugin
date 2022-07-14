import * as utils from "./utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import { is } from "@skylib/functions";
import type { strings } from "@skylib/functions";

export interface Options {
  readonly allow: strings;
  readonly disallow: strings;
}

export interface SubOptions {
  readonly allow: strings;
  readonly disallow: strings;
}

export enum MessageId {
  disallowedSource = "disallowedSource"
}

export const disallowImport = utils.createRule({
  name: "disallow-import",
  isOptions: is.object.factory<Options>(
    { allow: is.strings, disallow: is.strings },
    {}
  ),
  defaultOptions: { allow: [], disallow: [] },
  isSubOptions: is.object.factory<SubOptions>(
    { allow: is.strings, disallow: is.strings },
    {}
  ),
  defaultSubOptions: { allow: [], disallow: [] },
  subOptionsKey: "exclusions",
  messages: {
    [MessageId.disallowedSource]: "Import from this source is not allowed"
  },
  create: (context): RuleListener => {
    const matcher = utils.createFileMatcher.disallowAllow(
      [
        context.options.disallow,
        ...context.subOptionsArray.map(subOptions => subOptions.disallow)
      ].flat(),
      [
        context.options.allow,
        ...context.subOptionsArray.map(subOptions => subOptions.allow)
      ].flat(),
      true,
      { dot: true }
    );

    return {
      CallExpression: (node): void => {
        if (
          node.callee.type === "Identifier" &&
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
      ExportAllDeclaration: (node): void => {
        const source = node.source;

        lintNode(source.value, source);
      },
      ExportNamedDeclaration: (node): void => {
        const source = node.source;

        if (source) lintNode(source.value, source);
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
      if (matcher(source))
        context.report({ messageId: MessageId.disallowedSource, node });
    }
  }
});
