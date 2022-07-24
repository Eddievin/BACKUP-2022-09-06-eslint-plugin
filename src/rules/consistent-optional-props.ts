import * as utils from "./utils";
import { ReadonlySet, a, evaluate, is } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { IndexedRecord } from "@skylib/functions";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";

export interface Options {
  readonly classes: Style;
  readonly interfaces: Style;
}

export interface SubOptions {
  readonly _id: string;
  readonly pattern: utils.Pattern;
  readonly propertyPattern: utils.Pattern;
  readonly style: Style;
  readonly target?: Target;
}

export enum MessageId {
  combined = "combined",
  combinedId = "combinedId",
  optional = "optional",
  optionalId = "optionalId",
  // eslint-disable-next-line @typescript-eslint/no-shadow -- Wait for https://github.com/typescript-eslint/typescript-eslint/issues/5337
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
    {
      _id: is.string,
      pattern: utils.isPattern,
      propertyPattern: utils.isPattern,
      style: isStyle
    },
    { target: isTarget }
  ),
  defaultSubOptions: { pattern: [], propertyPattern: [] },
  subOptionsKey: "overrides",
  messages: {
    [MessageId.combined]: 'Prefer "x?: T | undefined" style',
    [MessageId.combinedId]: 'Prefer "x?: T | undefined" style ({{ _id }})',
    [MessageId.optional]: 'Prefer "x?: T" style',
    [MessageId.optionalId]: 'Prefer "x?: T" style ({{ _id }})',
    [MessageId.undefined]: 'Prefer "x: T | undefined" style',
    [MessageId.undefinedId]: 'Prefer "x: T | undefined" style ({{ _id }})'
  },
  create: (context, typeCheck): RuleListener => {
    const subOptionsArray = a.sort(
      context.subOptionsArray.map((subOptions): Matchers & SubOptions => {
        const matcher = utils.createRegexpMatcher(subOptions.pattern, true);

        const properyMatcher = utils.createRegexpMatcher(
          subOptions.propertyPattern,
          true
        );

        return { ...subOptions, matcher, properyMatcher };
      }),
      (matcher1, matcher2) => utils.compare(matcher2._id, matcher1._id)
    );

    return {
      ClassDeclaration: lintClass,
      ClassExpression: lintClass,
      TSInterfaceDeclaration: lintInterface
    };

    function lintClass(
      node: TSESTree.ClassDeclaration | TSESTree.ClassExpression
    ): void {
      const name = node.id ? node.id.name : "?";

      for (const property of node.body.body)
        if (
          property.type === AST_NODE_TYPES.PropertyDefinition ||
          property.type === AST_NODE_TYPES.TSAbstractPropertyDefinition
        )
          lintProperty(property, Target.classes, name);
    }

    function lintInterface(node: TSESTree.TSInterfaceDeclaration): void {
      const name = node.id.name;

      for (const property of node.body.body)
        if (property.type === AST_NODE_TYPES.TSPropertySignature)
          lintProperty(property, Target.interfaces, name);
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
        const { typeAnnotation } = node.typeAnnotation;

        const got = evaluate(() => {
          const type = typeCheck.getType(typeAnnotation);

          const hasUndefined = typeCheck.typeHas(
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
          const subOptions = evaluate(() => {
            const propertyName = context.getMemberName(node);

            const targets = new ReadonlySet([target, undefined]);

            return subOptionsArray.find(
              candidate =>
                targets.has(candidate.target) &&
                candidate.matcher(name) &&
                candidate.properyMatcher(propertyName)
            );
          });

          const expected = evaluate(() => {
            const result = subOptions
              ? subOptions.style
              : context.options[target];

            return exclusionTypes.has(typeAnnotation.type) &&
              exclusionStyles.has(got) &&
              exclusionStyles.has(result)
              ? undefined
              : result;
          });

          if (expected) {
            const data: IndexedRecord = subOptions
              ? { _id: subOptions._id }
              : {};

            const messageId = evaluate(() => {
              switch (expected) {
                case Style.combined:
                  return subOptions ? MessageId.combinedId : MessageId.combined;

                case Style.optional:
                  return subOptions ? MessageId.optionalId : MessageId.optional;

                case Style.undefined:
                  return subOptions
                    ? MessageId.undefinedId
                    : MessageId.undefined;
              }
            });

            if (got === expected) {
              // Valid
            } else context.report({ data, messageId, node });
          }
        }
      }
    }
  }
});

const exclusionTypes = new ReadonlySet([
  AST_NODE_TYPES.TSAnyKeyword,
  AST_NODE_TYPES.TSUnknownKeyword
]);

const exclusionStyles = new ReadonlySet([Style.combined, Style.optional]);

interface Matchers {
  readonly matcher: utils.Matcher;
  readonly properyMatcher: utils.Matcher;
}
