/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../utils";
import { typescript } from "../typescript";

export const preferToStrictEqual = utils.wrapRule(
  typescript["restrict-syntax"],
  [
    {
      message: 'Prefer "toStrictEqual" matcher',
      selector: "CallExpression[callee.property.name=toBe] > .arguments",
      typeIsNoneOf: [
        utils.TypeGroup.boolean,
        utils.TypeGroup.number,
        utils.TypeGroup.string
      ]
    }
  ]
);
