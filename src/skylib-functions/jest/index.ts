import * as utils from "../../utils";
import { preferMockCallsToBe } from "./prefer-mockCallsToBe";

export const jest = utils.prefixKeys("jest/", {
  "prefer-mockCallsToBe": preferMockCallsToBe
});
