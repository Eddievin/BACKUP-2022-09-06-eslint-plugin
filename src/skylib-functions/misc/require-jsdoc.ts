import * as utils from "../../utils";
import { misc } from "../../misc";

export const requireJsdoc = utils.wrapRule(misc["require-jsdoc"], [
  {
    includeSelectors: [
      "ArrowFunctionExpression",
      "FunctionExpression",
      "ObjectExpression > Property > ArrowFunctionExpression",
      "ObjectExpression > Property > FunctionExpression"
    ].map(
      selector =>
        `:matches(ExportNamedDeclaration, Program, TSModuleBlock) > VariableDeclaration > VariableDeclarator[id.typeAnnotation=undefined] > CallExpression[callee.name=defineFn] > ${selector}`
    ),
    noDefaultSelectors: true
  }
]);
