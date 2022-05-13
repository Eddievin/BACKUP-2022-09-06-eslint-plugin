import * as utils from "./utils";
import { is } from "@skylib/functions";
import type { strings } from "@skylib/functions";
import type { TSESTree } from "@typescript-eslint/utils";

export const disallowIdentifier = utils.createRule({
  create: context => {
    return {
      ":not(Property) > Identifier:not(.property)": (
        node: TSESTree.Identifier
      ): void => {
        for (const subOptions of context.subOptionsArray)
          if (subOptions.ids.includes(node.name.valueOf()))
            context.report({
              fix: () =>
                is.not.empty(subOptions.replacement)
                  ? [{ range: node.range, text: subOptions.replacement }]
                  : [],
              messageId: "disallowedIdentifier",
              node
            });
      }
    };
  },
  fixable: "code",
  isRuleOptions: is.object,
  isSubOptions: is.object.factory<SubOptions>(
    { ids: is.strings },
    { replacement: is.string }
  ),
  messages: { disallowedIdentifier: "Disallowed identifier" },
  name: "disallow-identifier"
});

interface SubOptions {
  readonly ids: strings;
  readonly replacement?: string;
}
