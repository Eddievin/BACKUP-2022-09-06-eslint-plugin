import * as utils from "../utils";
import { misc } from "../misc";

export const sortSuboptions = utils.wrapRule(misc["sort-array"], [
  {
    key: "_id",
    selector:
      "Property[key.value=/@skylib\\u002F/u] > ArrayExpression > ObjectExpression > Property[key.name=/^(?:overrides|rules|sources)$/u] > ArrayExpression",
    sendToBottom: /^catch-all$/u.source
  }
]);
