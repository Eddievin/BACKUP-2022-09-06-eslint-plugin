/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferUndefinedShorthandTypeName = utils.wrapRule(
  misc["restrict-syntax"],
  [
    {
      message: 'Prefer "...U" type',
      selector: [
        "TSUnionType[types.0.typeName.name=/^(?:NumStr|PropertyKey)$/u][types.1.type=TSUndefinedKeyword]",
        "TSUnionType[types.0.typeName.name=/^(?:NumStr|PropertyKey)$/u][types.1.typeName.name=empty]",
        "TSUnionType[types.0.typeName.name=/^(?:NumStr|PropertyKey)$/u][types.2.type=TSUndefinedKeyword]",
        "TSUnionType[types.0.typeName.name=/^(?:NumStr|PropertyKey)$/u][types.2.typeName.name=empty]",
        "TSUnionType[types.1.typeName.name=/^(?:NumStr|PropertyKey)$/u][types.0.type=TSUndefinedKeyword]",
        "TSUnionType[types.1.typeName.name=/^(?:NumStr|PropertyKey)$/u][types.0.typeName.name=empty]",
        "TSUnionType[types.1.typeName.name=/^(?:NumStr|PropertyKey)$/u][types.2.type=TSUndefinedKeyword]",
        "TSUnionType[types.1.typeName.name=/^(?:NumStr|PropertyKey)$/u][types.2.typeName.name=empty]",
        "TSUnionType[types.2.typeName.name=/^(?:NumStr|PropertyKey)$/u][types.0.type=TSUndefinedKeyword]",
        "TSUnionType[types.2.typeName.name=/^(?:NumStr|PropertyKey)$/u][types.0.typeName.name=empty]",
        "TSUnionType[types.2.typeName.name=/^(?:NumStr|PropertyKey)$/u][types.1.type=TSUndefinedKeyword]",
        "TSUnionType[types.2.typeName.name=/^(?:NumStr|PropertyKey)$/u][types.1.typeName.name=empty]"
      ]
    }
  ]
);
