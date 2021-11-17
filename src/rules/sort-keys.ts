import * as _ from "lodash";
import type { TSESTree } from "@typescript-eslint/experimental-utils";
import { AST_NODE_TYPES } from "@typescript-eslint/experimental-utils";
import type { RuleFix } from "@typescript-eslint/experimental-utils/dist/ts-eslint";

import * as a from "@skylib/functions/dist/array";
import * as assert from "@skylib/functions/dist/assertions";
import * as is from "@skylib/functions/dist/guards";
import { createValidationObject } from "@skylib/functions/dist/types/core";

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
            assert.byGuard(property.key.type, isExpectedKeyType);

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
            }
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
  readonly key: unknown;
  readonly node: TSESTree.MethodDefinition | TSESTree.Property;
}

type ExpectedKeyType = AST_NODE_TYPES.Identifier | AST_NODE_TYPES.Literal;

const ExpectedKeyTypeVO = createValidationObject<ExpectedKeyType>({
  [AST_NODE_TYPES.Identifier]: AST_NODE_TYPES.Identifier,
  [AST_NODE_TYPES.Literal]: AST_NODE_TYPES.Literal
});

const isExpectedKeyType = is.factory(is.enumeration, ExpectedKeyTypeVO);
