import { assert, is } from "@skylib/functions";
import type { strings } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import * as utils from "./utils";

export const disallowImport = utils.createRule({
  create(context) {
    const matchers = context.subOptionsArray.map(subOptions =>
      utils.createFileMatcher.disallowAllow(
        subOptions.disallow,
        subOptions.allow,
        true,
        { dot: true }
      )
    );

    return {
      [AST_NODE_TYPES.ImportDeclaration](node): void {
        const source = node.source.value;

        assert.string(source);

        if (matchers.some(matcher => matcher(source)))
          context.report({ messageId: "disallowedSource", node });
      }
    };
  },
  defaultSubOptions: { allow: [], disallow: [] },
  isRuleOptions: is.object,
  isSubOptions: is.object.factory<SubOptions>(
    { allow: is.strings, disallow: is.strings },
    {}
  ),
  messages: { disallowedSource: "Import from this source is not allowed" },
  name: "disallow-import"
});

interface SubOptions {
  readonly allow: strings;
  readonly disallow: strings;
}
