import * as utils from "./utils";
import { a, assert, is } from "@skylib/functions";
import * as _ from "@skylib/lodash-commonjs-es";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { numberU } from "@skylib/functions";
import type { TSESTree } from "@typescript-eslint/utils";
import type { RuleFix } from "@typescript-eslint/utils/dist/ts-eslint";

export const sortKeys = utils.createRule({
  create: context => {
    return {
      [AST_NODE_TYPES.ObjectExpression]: (node): void => {
        const group: Item[] = [];

        for (const property of node.properties)
          if (property.type === AST_NODE_TYPES.SpreadElement) flush();
          else {
            if (
              context
                .getLeadingTrivia(property)
                .includes("@skylib/sort-keys break")
            )
              flush();

            switch (property.key.type) {
              case AST_NODE_TYPES.Identifier:
                group.push({
                  index: group.length,
                  key: property.key.name,
                  node: property
                });

                break;

              case AST_NODE_TYPES.Literal:
                group.push({
                  index: group.length,
                  key: property.key.value,
                  node: property
                });

                break;

              default:
                group.push({
                  index: group.length,
                  key: `\u0000${context.getText(property.key)}`,
                  node: property
                });
            }
          }

        flush();

        function flush(): void {
          lintNodes(group, context);
          group.length = 0;
        }
      }
    };
  },
  fixable: "code",
  isRuleOptions: is.object,
  messages: { incorrectSortingOrder: "Incorrect sorting order" },
  name: "sort-keys"
});

type Context = utils.Context<MessageId, object, object>;

interface Item {
  readonly index: number;
  readonly key: unknown;
  readonly node: TSESTree.MethodDefinition | TSESTree.Property;
}

type MessageId = utils.MessageId<typeof sortKeys>;

/**
 * Lints group.
 *
 * @param group - Items.
 * @param context - Context.
 */
function lintNodes(group: readonly Item[], context: Context): void {
  if (group.length > 1) {
    const sortedGroup = _.sortBy(group, item => item.key);

    const fixes: RuleFix[] = [];

    let min: numberU;

    let max: numberU;

    for (const [index, sortedItem] of sortedGroup.entries())
      if (sortedItem.index === index) {
        // Valid
      } else {
        const item = a.get(group, index);

        min = is.not.empty(min) ? Math.min(min, index) : index;
        max = is.not.empty(max) ? Math.max(max, index) : index;
        fixes.push({
          range: context.getRangeWithLeadingTrivia(item.node),
          text: context.getTextWithLeadingTrivia(sortedItem.node)
        });
      }

    if (fixes.length) {
      assert.not.empty(min);
      assert.not.empty(max);

      const loc = context.getLocFromRange([
        a.get(group, min).node.range[0],
        a.get(group, max).node.range[1]
      ]);

      context.report({
        fix: () => fixes,
        loc,
        messageId: "incorrectSortingOrder"
      });
    }
  }
}
