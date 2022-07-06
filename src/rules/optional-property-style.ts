import * as utils from "./utils";
import { createValidationObject, evaluate, is } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import * as ts from "typescript";
import type { strings } from "@skylib/functions";
import type { TSESTree } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";

export const optionalPropertyStyle = evaluate(() => {
  const StyleVO = createValidationObject<Style>({
    combined: "combined",
    optional: "optional",
    undefined: "undefined"
  });

  const TargetVO = createValidationObject<Target>({
    classes: "classes",
    interfaces: "interfaces"
  });

  const isStyle = is.factory(is.enumeration, StyleVO);

  const isTarget = is.factory(is.enumeration, TargetVO);

  return utils.createRule({
    // eslint-disable-next-line sonarjs/cognitive-complexity
    create: (context): RuleListener => {
      return {
        "ClassDeclaration, ClassExpression, TSInterfaceDeclaration": (
          node:
            | TSESTree.ClassDeclaration
            | TSESTree.ClassExpression
            | TSESTree.TSInterfaceDeclaration
        ): void => {
          const name = node.id?.name;

          const target = evaluate<Target>(() => {
            switch (node.type) {
              case AST_NODE_TYPES.ClassDeclaration:
              case AST_NODE_TYPES.ClassExpression:
                return "classes";

              case AST_NODE_TYPES.TSInterfaceDeclaration:
                return "interfaces";
            }
          });

          for (const property of node.body.body)
            switch (property.type) {
              case AST_NODE_TYPES.PropertyDefinition:
              case AST_NODE_TYPES.TSAbstractPropertyDefinition:
              case AST_NODE_TYPES.TSPropertySignature:
                lintNode(property, target, name);

                break;

              default:
              // Skip
            }
        }
      };

      function lintNode(
        node:
          | TSESTree.PropertyDefinition
          | TSESTree.TSAbstractPropertyDefinition
          | TSESTree.TSPropertySignature,
        target: Target,
        name = ""
      ): void {
        if (node.typeAnnotation) {
          const tsNode = context.toTsNode(node.typeAnnotation.typeAnnotation);

          const type = context.checker.getTypeAtLocation(tsNode);

          const got = evaluate<Style | undefined>(() => {
            const optional = node.optional ?? false;

            const hasUndefined =
              type.isUnion() &&
              type.types.some(
                subtype => subtype.getFlags() === ts.TypeFlags.Undefined
              );

            if (optional && hasUndefined) return "combined";

            if (optional) return "optional";

            if (hasUndefined) return "undefined";

            return undefined;
          });

          const expected = evaluate(() => {
            const targets = new Set([target, undefined]);

            return (
              context.subOptionsArray
                .map(subOptions => {
                  const matcher = subOptions.patterns
                    ? utils.createMatcher(subOptions.patterns)
                    : (): boolean => true;

                  const propertyMatcher = subOptions.propertyPatterns
                    ? utils.createMatcher(subOptions.propertyPatterns)
                    : (): boolean => true;

                  return targets.has(subOptions.target) &&
                    matcher(name) &&
                    propertyMatcher(context.getMemberName(node))
                    ? subOptions.style
                    : undefined;
                })
                .filter(is.not.empty)
                .pop() ?? context.options[target]
            );
          });

          if (
            node.typeAnnotation.typeAnnotation.type ===
              AST_NODE_TYPES.TSAnyKeyword ||
            node.typeAnnotation.typeAnnotation.type ===
              AST_NODE_TYPES.TSUnknownKeyword
          )
            if (got === "optional" && expected === "undefined")
              context.report({ messageId: "expectingUndefinedStyle", node });
            else {
              // Valid
            }
          else if (got && got !== expected)
            switch (expected) {
              case "combined":
                context.report({ messageId: "expectingCombinedStyle", node });

                break;

              case "optional":
                context.report({ messageId: "expectingOptionalStyle", node });

                break;

              case "undefined":
                context.report({ messageId: "expectingUndefinedStyle", node });
            }
          else {
            // Valid
          }
        }
      }
    },
    defaultOptions: { classes: "combined", interfaces: "combined" },
    isRuleOptions: is.object.factory<RuleOptions>(
      { classes: isStyle, interfaces: isStyle },
      {}
    ),
    isSubOptions: is.object.factory<SubOptions>(
      { _id: is.string, style: isStyle },
      {
        patterns: is.strings,
        propertyPatterns: is.strings,
        target: isTarget
      }
    ),
    messages: {
      expectingCombinedStyle:
        "Expecting combined style for optional property (e.g. x?: string | undefined) ({{ _id }})",
      expectingOptionalStyle:
        "Expecting optional style for optional property (e.g. x?: string) ({{ _id }})",
      expectingUndefinedStyle:
        "Expecting undefined style for optional property (e.g. x: string | undefined) ({{ _id }})"
    },
    name: "optional-property-style",
    subOptionsKey: "overrides"
  });

  interface RuleOptions {
    readonly classes: Style;
    readonly interfaces: Style;
  }

  type Style = "combined" | "optional" | "undefined";

  interface SubOptions {
    readonly _id: string;
    readonly patterns?: strings;
    readonly propertyPatterns?: strings;
    readonly style: Style;
    readonly target?: Target;
  }

  type Target = "classes" | "interfaces";
});
