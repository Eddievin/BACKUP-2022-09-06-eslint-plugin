import * as _ from "lodash";
import type { TSESTree } from "@typescript-eslint/experimental-utils";
import { AST_NODE_TYPES } from "@typescript-eslint/experimental-utils";
import type { RuleFix } from "@typescript-eslint/experimental-utils/dist/ts-eslint";

import * as a from "@skylib/functions/dist/array";
import * as assert from "@skylib/functions/dist/assertions";
import * as is from "@skylib/functions/dist/guards";
import type { numberU } from "@skylib/functions/dist/types/core";

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
          if (group.length > 1)
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

              let min: numberU = undefined;

              let max: numberU = undefined;

              for (const [index, sortedItem] of sortedGroup.entries())
                if (sortedItem.index !== index) {
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
      },
      [AST_NODE_TYPES.ExportDefaultDeclaration](node): void {
        exportDefaultDeclarations.push(node);
      },
      [AST_NODE_TYPES.ObjectExpression](node): void {
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
          groups.push(a.clone(group));
          group.length = 0;
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
  readonly key: unknown;
  readonly node: TSESTree.MethodDefinition | TSESTree.Property;
}
