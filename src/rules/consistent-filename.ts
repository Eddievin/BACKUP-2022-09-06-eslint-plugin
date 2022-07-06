import * as utils from "./utils";
import { createValidationObject, evaluate, is, o, s } from "@skylib/functions";
import * as _ from "@skylib/lodash-commonjs-es";
import path from "node:path";
import type { stringU } from "@skylib/functions";
import type { TSESTree } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";

export const consistentFilename = evaluate(() => {
  const FormatVO = createValidationObject<Format>({
    "PascalCase": "PascalCase",
    "camelCase": "camelCase",
    "kebab-case": "kebab-case"
  });

  const isFormat = is.factory(is.enumeration, FormatVO);

  const isRuleOptions = is.object.factory({ format: isFormat }, {});

  const isSubOptions = is.object.factory(
    { format: isFormat, selector: is.string },
    {}
  );

  return utils.createRule({
    create: (context): RuleListener => {
      let className: stringU;

      let format = context.options.format;

      return {
        ...o.fromEntries(
          context.subOptionsArray.map(subOptions => [
            subOptions.selector,
            () => {
              format = subOptions.format;
            }
          ])
        ),
        "Program > :matches(ExportDefaultDeclaration, ExportNamedDeclaration) > ClassDeclaration > Identifier.id":
          (node: TSESTree.Identifier): void => {
            className = node.name;
          },
        "Program:exit": (): void => {
          const { base } = path.parse(context.path);

          const expected = base
            .split(".")
            .map((part, index) => {
              if (index === 0) {
                if (is.not.empty(className)) return className;

                switch (format) {
                  case "PascalCase":
                    return s.ucFirst(_.camelCase(part));

                  case "camelCase":
                    return _.camelCase(part);

                  case "kebab-case":
                    return _.kebabCase(part);
                }
              }

              return _.kebabCase(part);
            })
            .join(".");

          if (base === expected) {
            // Valid
          } else
            context.report({
              data: { expected },
              loc: context.locZero,
              messageId: "invalidFilename"
            });
        }
      };
    },
    defaultOptions: { format: "kebab-case" },
    isRuleOptions,
    isSubOptions,
    messages: { invalidFilename: "Expecting file name to be: {{ expected }}" },
    name: "consistent-filename",
    subOptionsKey: "overrides"
  });

  type Format = "camelCase" | "kebab-case" | "PascalCase";
});
