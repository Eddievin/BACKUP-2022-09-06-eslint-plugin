import * as utils from "./utils";
import { is } from "@skylib/functions";
import * as _ from "@skylib/lodash-commonjs-es";
import path from "path";
import type { stringU } from "@skylib/functions";
import type { TSESTree } from "@typescript-eslint/utils";

export const consistentFilename = utils.createRule({
  create(context) {
    let className: stringU;

    return {
      "Program > :matches(ExportDefaultDeclaration, ExportNamedDeclaration) > ClassDeclaration > Identifier.id"(
        node: TSESTree.Identifier
      ): void {
        className = node.name;
      },
      "Program:exit"(): void {
        const got = path.parse(context.path).name;

        const expected =
          className ??
          got
            .split(".")
            .map(part => _.kebabCase(part))
            .join(".");

        if (got === expected) {
          // Valid
        } else
          context.report({
            loc: context.locZero,
            messageId: "invalidFilename"
          });
      }
    };
  },
  isRuleOptions: is.object,
  messages: { invalidFilename: "Invalid file name" },
  name: "filename"
});
