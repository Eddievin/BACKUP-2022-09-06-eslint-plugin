import { AST_NODE_TYPES } from "@typescript-eslint/experimental-utils";

import * as assert from "@skylib/functions/dist/assertions";
import * as is from "@skylib/functions/dist/guards";

import * as utils from "./utils";

interface SubOptions {
  readonly allow: readonly string[];
  readonly disallow: readonly string[];
}

const isSubOptions: is.Guard<SubOptions> = is.factory(
  is.object.of,
  { allow: is.strings, disallow: is.strings },
  {}
);

const rule = utils.createRule({
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
          context.report({
            messageId: "disallowedSource",
            node
          });
      }
    };
  },
  defaultSubOptions: {
    allow: [],
    disallow: []
  },
  isRuleOptions: is.object,
  isSubOptions,
  messages: {
    disallowedSource: "Import from this source is not allowed"
  }
});

export = rule;
