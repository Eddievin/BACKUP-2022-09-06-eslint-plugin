/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../utils";
import { typescript } from "../typescript";

export const preferToBe = utils.wrapRule(
  typescript["typescript/no-restricted-syntax"],
  [
    {
      message: 'Use "toBe" matcher instead',
      selector:
        "CallExpression[callee.property.name=toStrictEqual] > .arguments",
      typeIsOneOf: [
        utils.TypeGroup.boolean,
        utils.TypeGroup.number,
        utils.TypeGroup.string
      ]
    }
  ]
);
