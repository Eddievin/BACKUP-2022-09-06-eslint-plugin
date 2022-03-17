import type { TSESTree } from "@typescript-eslint/utils";

import * as is from "@skylib/functions/dist/guards";
import type { strings } from "@skylib/functions/dist/types/core";

import * as utils from "./utils";

interface SubOptions {
  readonly ids: strings;
  readonly replacement?: string;
}

const isSubOptions: is.Guard<SubOptions> = is.factory(
  is.object.of,
  { ids: is.strings },
  { replacement: is.string }
);

const rule = utils.createRule({
  create(context) {
    return {
      ":not(Property) > Identifier:not(.property)"(
        node: TSESTree.Identifier
      ): void {
        for (const subOptions of context.subOptionsArray)
          if (subOptions.ids.includes(node.name.valueOf()))
            context.report({
              fix() {
                return is.not.empty(subOptions.replacement)
                  ? [
                      {
                        range: node.range,
                        text: subOptions.replacement
                      }
                    ]
                  : [];
              },
              messageId: "disallowedIdentifier",
              node
            });
      }
    };
  },
  fixable: "code",
  isRuleOptions: is.object,
  isSubOptions,
  messages: {
    disallowedIdentifier: "Disallowed identifier"
  }
});

export = rule;
