import * as utils from "../utils";
import { core } from "./core";

export const noTrueType = utils.wrapRule(core["no-restricted-syntax"], [
  {
    message: 'Prefer "boolean" type',
    selector:
      "TSPropertySignature[optional=true] > .typeAnnotation > TSLiteralType.typeAnnotation > .literal[value=true]"
  }
]);
