import * as utils from "./utils";
import { is } from "@skylib/functions";
import * as _ from "@skylib/lodash-commonjs-es";
import path from "node:path";
import type { stringU } from "@skylib/functions";
import type { TSESTree } from "@typescript-eslint/utils";

export const consistentFilename = utils.createRule({
  create: context => {
    let className: stringU;

    return {
      "Program > :matches(ExportDefaultDeclaration, ExportNamedDeclaration) > ClassDeclaration > Identifier.id":
        (node: TSESTree.Identifier): void => {
          className = node.name;
        },
      "Program:exit": (): void => {
        const { base } = path.parse(context.path);

        const expected = base
          .split(".")
          .map((part, index) =>
            index === 0 && is.not.empty(className)
              ? className
              : _.kebabCase(part)
          )
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
  isRuleOptions: is.object,
  messages: { invalidFilename: "Expecting file name to be: {{ expected }}" },
  name: "filename"
});
