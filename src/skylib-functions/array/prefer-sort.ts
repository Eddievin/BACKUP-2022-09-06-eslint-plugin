import * as utils from "../../utils";
import { typescript } from "../../typescript";

export const preferSort = utils.wrapRule(typescript["restrict-syntax"], [
  {
    message: 'No mutation side-effect, use "a.sort" instead',
    selector: ".callee[property.name=sort] > .object",
    typeHas: utils.TypeGroup.array
  }
]);
