import * as utils from "../utils";
import { core } from "./core";

export const preferArrayTypeAlias = utils.wrapRule(core["restrict-syntax"], [
  {
    message: "Prefer alias for array type",
    selector: [
      "TSArrayType[elementType.type!=TSAnyKeyword]",
      "TSTupleType[elementTypes.0.type!=TSAnyKeyword][elementTypes.1.type!=TSAnyKeyword][elementTypes.2.type!=TSAnyKeyword]",
      "TSTypeReference[typeName.name=/^(?:Array|ReadonlyArray)$/u][typeParameters.params.0.type!=TSAnyKeyword]"
    ]
  }
]);
