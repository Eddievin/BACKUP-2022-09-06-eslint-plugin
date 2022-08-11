/* eslint-disable @skylib/consistent-filename -- Postponed */

import * as utils from "../../utils";
import { misc } from "../../misc";

// eslint-disable-next-line @skylib/max-identifier-blocks -- Postponed
export const requireReturnInDefineFn = utils.wrapRule(
  misc["no-restricted-syntax"],
  [
    {
      message: "Missing return type on function",
      selector: [
        "ArrowFunctionExpression[returnType=undefined]",
        "FunctionExpression[returnType=undefined]",
        "ObjectExpression > Property > ArrowFunctionExpression[returnType=undefined]",
        "ObjectExpression > Property > FunctionExpression[returnType=undefined]"
      ].map(
        selector =>
          `:matches(ExportNamedDeclaration, Program, TSModuleBlock) > VariableDeclaration > VariableDeclarator[id.typeAnnotation=undefined] > CallExpression[callee.name=defineFn] > ${selector}`
      )
    }
  ]
);
