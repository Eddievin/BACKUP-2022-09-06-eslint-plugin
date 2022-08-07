import * as utils from "../../utils";
import { script } from "./script";
import { template } from "./template";

export const vue = utils.prefixKeys("vue/", { ...script, ...template });
