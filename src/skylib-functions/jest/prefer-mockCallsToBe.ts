/* eslint-disable @skylib/consistent-filename -- Postponed */

import * as utils from "../../utils";
import { misc } from "../../misc";

// eslint-disable-next-line @skylib/max-identifier-blocks -- Postponed
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
