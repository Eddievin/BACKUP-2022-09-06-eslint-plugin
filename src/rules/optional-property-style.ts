import { createValidationObject, fn, is } from "@skylib/functions";
import type { TSESTree } from "@typescript-eslint/utils";
import * as ts from "typescript";
import * as utils from "./utils";

export const optionalPropertyStyle = utils.createRule({
  create(context) {
    return {
      "PropertyDefinition, TSPropertySignature"(
        node: TSESTree.PropertyDefinition | TSESTree.TSPropertySignature
      ): void {
        if (node.typeAnnotation) {
          const tsNode = context.toTsNode(node.typeAnnotation.typeAnnotation);

          const type = context.checker.getTypeAtLocation(tsNode);

          const got = fn.run<Style | undefined>(() => {
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

          const expected = context.options.style;

          if (got && got !== expected)
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
        }
      }
    };
  },
  defaultOptions: { style: "combined" },
  isRuleOptions: fn.run(() => {
    const StyleVO = createValidationObject<Style>({
      combined: "combined",
      optional: "optional",
      undefined: "undefined"
    });

    const isStyle = is.factory(is.enumeration, StyleVO);

    return is.object.factory({ style: isStyle }, {});
  }),
  messages: {
    expectingCombinedStyle:
      'Expecting optional property style to be "x?: string | undefined"',
    expectingOptionalStyle:
      'Expecting optional property style to be "x?: string"',
    expectingUndefinedStyle:
      'Expecting optional property style to be "x: string | undefined"'
  },
  name: "optional-property-style"
});

type Style = "combined" | "optional" | "undefined";
