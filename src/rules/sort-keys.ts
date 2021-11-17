import * as _ from "lodash";
import type { TSESTree } from "@typescript-eslint/experimental-utils";
import { AST_NODE_TYPES } from "@typescript-eslint/experimental-utils";
import type { RuleFix } from "@typescript-eslint/experimental-utils/dist/ts-eslint";

import * as a from "@skylib/functions/dist/array";
import * as assert from "@skylib/functions/dist/assertions";
import * as is from "@skylib/functions/dist/guards";

import * as utils from "./utils";

interface RuleOptions {
  readonly ignoreDefaultExport: boolean;
}

const isRuleOptions: is.Guard<RuleOptions> = is.factory(
  is.object.of,
  { ignoreDefaultExport: is.boolean },
  {}
);

const rule = utils.createRule({
  create(context) {
    const exportDefaultDeclarations: TSESTree.ExportDefaultDeclaration[] = [];

    const groups: Array<readonly Item[]> = [];

    return {
      "Program:exit"(): void {
        for (const group of groups)
          if (
            context.options.ignoreDefaultExport &&
            exportDefaultDeclarations.some(exportDefaultDeclaration =>
              group.some(
                item =>
                  item.node.range[0] >= exportDefaultDeclaration.range[0] &&
                  item.node.range[1] <= exportDefaultDeclaration.range[1]
              )
            )
          ) {
            // Ignore default export
          } else {
            const sortedGroup = _.sortBy(group, item => item.key);

            const fixes: RuleFix[] = [];

            for (const [index, sortedItem] of sortedGroup.entries())
              if (sortedItem.index !== index) {
                const item = a.get(group, index);

                fixes.push({
                  range: context.getRangeWithLeadingTrivia(item.node),
                  text: context.getTextWithLeadingTrivia(sortedItem.node)
                });
              }

            if (fixes.length)
              context.report({
                fix: () => fixes,
                messageId: "incorrectSortingOrder",
                node: a.first(group).node
              });
          }
      },
      [AST_NODE_TYPES.ExportDefaultDeclaration](node): void {
        exportDefaultDeclarations.push(node);
      },
      [AST_NODE_TYPES.ObjectExpression](node): void {
        const group: Item[] = [];

        for (const property of node.properties)
          if (property.type === AST_NODE_TYPES.SpreadElement) flush();
          else {
            assertIdentifier(property.key);

            group.push({
              index: group.length,
              key: property.key.name,
              node: property
            });
          }

        flush();

        function flush(): void {
          if (group.length) {
            groups.push(a.clone(group));
            group.length = 0;
          }
        }
      }
    };
  },
  defaultOptions: {
    ignoreDefaultExport: false
  },
  fixable: "code",
  isRuleOptions,
  messages: {
    incorrectSortingOrder: "Incorrect sorting order"
  }
});

export = rule;

/*
|*******************************************************************************
|* Private
|*******************************************************************************
|*/

interface Item {
  readonly index: number;
  readonly key: string;
  readonly node: TSESTree.MethodDefinition | TSESTree.Property;
}

/**
 * Asserts that node is identifier.
 *
 * @param node - Node.
 */
function assertIdentifier(
  node: TSESTree.Node
): asserts node is TSESTree.Identifier {
  assert.toBeTrue(node.type === AST_NODE_TYPES.Identifier);
}
