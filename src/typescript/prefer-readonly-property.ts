import * as utils from "../utils";
import { core } from "./core";

export const preferReadonlyProperty = utils.wrapRule(core["restrict-syntax"], [
  {
    message: "Prefer readonly property",
    selector: `:matches(${utils.selectors.property})[readonly!=true]`
  }
]);
