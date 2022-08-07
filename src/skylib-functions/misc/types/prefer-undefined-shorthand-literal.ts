import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferUndefinedShorthandLiteral = utils.wrapRule(
  misc["no-restricted-syntax"],
  [
    {
      message: 'Prefer "...U" type',
      selector: [
        "TSUnionType[types.0.literal.raw=/(?:false|true)/u][types.1.type=TSUndefinedKeyword]",
        "TSUnionType[types.0.literal.raw=/(?:false|true)/u][types.1.typeName.name=empty]",
        "TSUnionType[types.0.literal.raw=/(?:false|true)/u][types.2.type=TSUndefinedKeyword]",
        "TSUnionType[types.0.literal.raw=/(?:false|true)/u][types.2.typeName.name=empty]",
        "TSUnionType[types.1.literal.raw=/(?:false|true)/u][types.0.type=TSUndefinedKeyword]",
        "TSUnionType[types.1.literal.raw=/(?:false|true)/u][types.0.typeName.name=empty]",
        "TSUnionType[types.1.literal.raw=/(?:false|true)/u][types.2.type=TSUndefinedKeyword]",
        "TSUnionType[types.1.literal.raw=/(?:false|true)/u][types.2.typeName.name=empty]",
        "TSUnionType[types.2.literal.raw=/(?:false|true)/u][types.0.type=TSUndefinedKeyword]",
        "TSUnionType[types.2.literal.raw=/(?:false|true)/u][types.0.typeName.name=empty]",
        "TSUnionType[types.2.literal.raw=/(?:false|true)/u][types.1.type=TSUndefinedKeyword]",
        "TSUnionType[types.2.literal.raw=/(?:false|true)/u][types.1.typeName.name=empty]"
      ]
    }
  ]
);
