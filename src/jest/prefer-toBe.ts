/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../utils";
import { typescript } from "../typescript";

export const preferToBe = utils.wrapRule(typescript["no-restricted-syntax"], [
  {
    message: 'Prefer "toBe" matcher',
    selector: "CallExpression[callee.property.name=toStrictEqual] > .arguments",
    typeIsOneOf: [
      utils.TypeGroup.boolean,
      utils.TypeGroup.number,
      utils.TypeGroup.string
    ]
  }
]);
