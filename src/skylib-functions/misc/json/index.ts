import * as utils from "../../../utils";
import { preferJson } from "./prefer-json";

export const json = utils.prefixKeys("json/", { "prefer-json": preferJson });
