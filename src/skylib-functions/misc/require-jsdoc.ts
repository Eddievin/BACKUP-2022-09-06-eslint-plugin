import * as utils from "../../utils";
import { misc } from "../../misc";

const prefix =
  ":matches(ExportNamedDeclaration, Program, TSModuleBlock) > VariableDeclaration > VariableDeclarator[id.typeAnnotation=undefined] > CallExpression[callee.name=defineFn]";

export const requireJsdoc = utils.wrapRule(misc["require-jsdoc"], [
  {
    includeSelectors: [
      `${prefix} > ArrowFunctionExpression`,
      `${prefix} > FunctionExpression`,
      `${prefix} > ObjectExpression > Property > ArrowFunctionExpression`,
      `${prefix} > ObjectExpression > Property > FunctionExpression`
    ],
    noDefaultSelectors: true
  }
]);
