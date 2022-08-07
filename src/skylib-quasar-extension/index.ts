import * as utils from "../utils";
import { extras } from "./extras";
import { jest } from "./jest";
import { misc } from "./misc";
import { vue } from "./vue";

export const skylibQuasarExtension = {
  extras: utils.prefixKeys("quasar-extension/", extras),
  jest: utils.prefixKeys("quasar-extension/", jest),
  misc: utils.prefixKeys("quasar-extension/", misc),
  vue: utils.prefixKeys("quasar-extension/", vue)
} as const;
