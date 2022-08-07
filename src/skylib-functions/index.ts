import * as utils from "../utils";
import { jest } from "./jest";
import { misc } from "./misc";

export const skylibFunctions = {
  jest: utils.prefixKeys("functions/", jest),
  misc: utils.prefixKeys("functions/", misc)
} as const;
