import * as utils from "../utils";
import { misc } from "../misc";

export const sortSuboptions = utils.wrapRule(misc["sort-array"], [
  {
    customOrder: ["catch-all"],
    selector:
      "Property[key.value=/@skylib\\u002F/u] > ArrayExpression > ObjectExpression > Property[key.name=/^(?:exclusions|overrides|rules|sources)$/u] > ArrayExpression",
    sortKey: "_id",
    triggerByComment: false
  }
]);
