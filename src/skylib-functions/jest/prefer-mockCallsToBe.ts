/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferMockCallsToBe = utils.wrapRule(
  misc["no-restricted-syntax"],
  [
    {
      message: 'Prefer "mockCallsToBe" function',
      selector: [
        "Identifier[name=mockClear]",
        "Identifier[name=toHaveBeenCalled]",
        "Identifier[name=toHaveBeenCalledTimes]",
        "Identifier[name=toHaveBeenCalledWith]"
      ]
    }
  ]
);
