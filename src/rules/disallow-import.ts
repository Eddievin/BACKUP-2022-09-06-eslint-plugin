import * as utils from "./utils";
import { as, is } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { strings } from "@skylib/functions";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";

export const disallowImport = utils.createRule({
  create: (context): RuleListener => {
    const matcher = utils.createFileMatcher.disallowAllow(
      context.options.disallow,
      context.options.allow,
      true,
      { dot: true }
    );

    return {
      [AST_NODE_TYPES.ImportDeclaration]: (node): void => {
        const source = as.string(node.source.value);

        if (matcher(source))
          context.report({ messageId: "disallowedSource", node });
      }
    };
  },
  defaultOptions: { allow: [], disallow: [] },
  isRuleOptions: is.object.factory<RuleOptions>(
    { allow: is.strings, disallow: is.strings },
    {}
  ),
  messages: { disallowedSource: "Import from this source is not allowed" },
  name: "disallow-import"
});

interface RuleOptions {
  readonly allow: strings;
  readonly disallow: strings;
}
