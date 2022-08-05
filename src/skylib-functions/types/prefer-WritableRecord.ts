/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferWritableRecord = utils.wrapRule(
  misc["no-restricted-syntax"],
  [
    {
      message: 'Prefer "WritableRecord" type',
      selector: "Identifier[name=Record]"
    }
  ]
);
