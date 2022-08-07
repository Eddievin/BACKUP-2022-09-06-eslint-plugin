import * as utils from "../utils";
import { preferUniqueIdFacade } from "./prefer-uniqueId-facade";

export const skylibFacades = utils.prefixKeys("facades/", {
  "prefer-uniqueId-facade": preferUniqueIdFacade
});
