/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../utils";
import { misc } from "../misc";

export const preferDefineFn = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Use "defineFn" instead',
    selector:
      ":matches(ExportNamedDeclaration, Program, TSModuleBlock) > VariableDeclaration > VariableDeclarator > CallExpression[callee.object.name=/^(Object|o)$/][callee.property.name=assign]"
  }
]);
