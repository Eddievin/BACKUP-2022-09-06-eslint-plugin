/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../utils";
import { misc } from "../../misc";

const prefix =
  ":matches(ExportNamedDeclaration, Program, TSModuleBlock) > VariableDeclaration > VariableDeclarator[id.typeAnnotation=undefined] > CallExpression[callee.name=defineFn]";

// eslint-disable-next-line @skylib/max-identifier-blocks -- Ok
export const requireReturnInDefineFn = utils.wrapRule(
  misc["no-restricted-syntax"],
  [
    {
      message: "Missing return type",
      selector: [
        `${prefix} > ArrowFunctionExpression[returnType=undefined]`,
        `${prefix} > FunctionExpression[returnType=undefined]`,
        `${prefix} > ObjectExpression > Property > ArrowFunctionExpression[returnType=undefined]`,
        `${prefix} > ObjectExpression > Property > FunctionExpression[returnType=undefined]`
      ]
    }
  ]
);
