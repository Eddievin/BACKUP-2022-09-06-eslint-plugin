import * as utils from "../../utils";
import { preferFindQuasarComponent } from "./prefer-findQuasarComponent";
import { preferTestComponents } from "./prefer-testComponents";

export const jest = utils.prefixKeys("jest/", {
  "prefer-findQuasarComponent": preferFindQuasarComponent,
  "prefer-testComponents": preferTestComponents
});
