/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferDefineProperty = utils.wrapRule(misc["restrict-syntax"], [
  {
    message: 'Prefer "o.defineProperty" function',
    selector:
      ":matches(ExportNamedDeclaration, Program, TSModuleBlock) > VariableDeclaration > VariableDeclarator > CallExpression[callee.object.name=o][callee.property.name=/^(?:assign|extend)$/u]"
  }
]);
