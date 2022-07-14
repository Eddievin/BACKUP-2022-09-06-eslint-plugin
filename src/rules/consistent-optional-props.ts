import * as utils from "./utils";
import { ReadonlySet, evaluate, is } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";

export interface Options {
  readonly classes: Style;
  readonly interfaces: Style;
}

export interface SubOptions {
  readonly _id: string;
  readonly pattern?: utils.Pattern;
  readonly propertyPattern?: utils.Pattern;
  readonly style: Style;
  readonly target?: Target;
}

export enum MessageId {
  combined = "combined",
  combinedId = "combinedId",
  optional = "optional",
  optionalId = "optionalId",
  // eslint-disable-next-line @typescript-eslint/no-shadow -- Postponed
  undefined = "undefined",
  undefinedId = "undefinedId"
}

export enum Target {
  classes = "classes",
  interfaces = "interfaces"
}

export const isTarget = is.factory(is.enumeration, Target);

export enum Style {
  combined = "combined",
  optional = "optional",
  // eslint-disable-next-line @typescript-eslint/no-shadow -- Wait for https://github.com/typescript-eslint/typescript-eslint/issues/5337
  undefined = "undefined"
}

export const isStyle = is.factory(is.enumeration, Style);

export const consistentOptionalProps = utils.createRule({
  name: "consistent-optional-props",
  isOptions: is.object.factory<Options>(
    { classes: isStyle, interfaces: isStyle },
    {}
  ),
  defaultOptions: { classes: Style.combined, interfaces: Style.combined },
  isSubOptions: is.object.factory<SubOptions>(
    { _id: is.string, style: isStyle },
    {
      pattern: utils.isPattern,
      propertyPattern: utils.isPattern,
      target: isTarget
    }
  ),
  subOptionsKey: "overrides",
  messages: {
    [MessageId.combined]:
      'Define optional property as "x?: string | undefined"',
    [MessageId.optional]: 'Define optional property as "x?: string"',
    [MessageId.optionalId]:
      'Define optional property as "x?: string" ({{ id }})',
    [MessageId.undefined]:
      'Define optional property as "x: string | undefined"',
    [MessageId.undefinedId]:
      'Define optional property as "x: string | undefined" ({{ id }})',
    combinedId:
      'Define optional property as "x?: string | undefined" ({{ id }})'
  },
  create: (context): RuleListener => {
    const interchangeableStyles = new ReadonlySet([
      Style.combined,
      Style.optional
    ]);

    const interchangeableTypes = new ReadonlySet([
      AST_NODE_TYPES.TSAnyKeyword,
      AST_NODE_TYPES.TSUnknownKeyword
    ]);

    const nodeTypeToTarget = {
      [AST_NODE_TYPES.ClassDeclaration]: Target.classes,
      [AST_NODE_TYPES.ClassExpression]: Target.classes,
      [AST_NODE_TYPES.TSInterfaceDeclaration]: Target.interfaces
    } as const;

    const matchers = context.subOptionsArray.map(
      (subOptions): Matcher => ({
        ...subOptions,
        nodeName: utils.createMatcher(subOptions.pattern, true),
        propName: utils.createMatcher(subOptions.propertyPattern, true)
      })
    );

    return {
      ClassDeclaration: lintNode,
      ClassExpression: lintNode,
      TSInterfaceDeclaration: lintNode
    };

    interface Matcher extends SubOptions {
      readonly nodeName: utils.Matcher;
      readonly propName: utils.Matcher;
    }

    function lintNode(
      node:
        | TSESTree.ClassDeclaration
        | TSESTree.ClassExpression
        | TSESTree.TSInterfaceDeclaration
    ): void {
      const name = node.id ? node.id.name : "?";

      const target = nodeTypeToTarget[node.type];

      for (const property of node.body.body)
        switch (property.type) {
          case AST_NODE_TYPES.PropertyDefinition:
          case AST_NODE_TYPES.TSAbstractPropertyDefinition:
          case AST_NODE_TYPES.TSPropertySignature:
            lintProperty(property, target, name);

            break;

          default:
          // Skip
        }
    }

    function lintProperty(
      node:
        | TSESTree.PropertyDefinition
        | TSESTree.TSAbstractPropertyDefinition
        | TSESTree.TSPropertySignature,
      target: Target,
      name: string
    ): void {
      if (node.typeAnnotation) {
        const typeAnnotation = node.typeAnnotation.typeAnnotation;

        const got = evaluate((): Style | undefined => {
          const type = context.typeCheck.getType(typeAnnotation);

          const hasUndefined = context.typeCheck.typeHas(
            type,
            utils.TypeGroup.undefined
          );

          const optional = node.optional ?? false;

          if (hasUndefined && optional) return Style.combined;

          if (hasUndefined) return Style.undefined;

          if (optional) return Style.optional;

          return undefined;
        });

        if (got) {
          const matcher = matchers.find(
            candidate =>
              new ReadonlySet([target, undefined]).has(candidate.target) &&
              candidate.nodeName(name) &&
              candidate.propName(context.getMemberName(node))
          );

          const expected = evaluate(() => {
            const result = matcher ? matcher.style : context.options[target];

            return interchangeableTypes.has(typeAnnotation.type) &&
              interchangeableStyles.has(got) &&
              interchangeableStyles.has(result)
              ? got
              : result;
          });

          const messageId = evaluate(() => {
            switch (expected) {
              case Style.combined:
                return matcher ? MessageId.combinedId : MessageId.combined;

              case Style.optional:
                return matcher ? MessageId.optionalId : MessageId.optional;

              case Style.undefined:
                return matcher ? MessageId.undefinedId : MessageId.undefined;
            }
          });

          if (got === expected) {
            // Valid
          } else if (matcher)
            context.report({
              data: { id: matcher._id },
              messageId,
              node
            });
          else context.report({ messageId, node });
        }
      }
    }
  }
});
