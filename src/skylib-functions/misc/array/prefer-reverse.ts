import * as utils from "../../../utils";
import { typescript } from "../../../typescript";

export const preferReverse = utils.wrapRule(
  typescript["typescript/no-restricted-syntax"],
  [
    {
      message: 'No mutation side-effect, use "a.reverse" instead',
      selector: ".callee[property.name=reverse] > .object",
      typeHas: utils.TypeGroup.array
    }
  ]
);
