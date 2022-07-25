import * as _ from "@skylib/lodash-commonjs-es";
// eslint-disable-next-line @skylib/consistent-import/project -- Ok
import * as rules1 from "./rules";
// eslint-disable-next-line @skylib/consistent-import/project -- Ok
import * as rules2 from "./wrapped-rules";
import * as utils from "./utils";
import { evaluate, o } from "@skylib/functions";
import type { WritableIndexedObject } from "@skylib/functions";
import fs from "node:fs";

export * as utils from "./utils";

// eslint-disable-next-line @skylib/custom/no-complex-type-in-function-return, @skylib/custom/no-complex-type-in-variable-declaration -- Postponed
export const rules = evaluate(() => {
  const core = o.fromEntries(
    o
      .entries({ ...rules1, ...rules2 })
      .map(([name, rule]) => [_.kebabCase(name), rule])
  );

  const synonyms: WritableIndexedObject = {};

  utils.getSynonyms(synonyms, "./.eslintrc.synonyms.js", core);

  if (fs.existsSync("./node_modules/@skylib"))
    for (const pkg of fs.readdirSync("./node_modules/@skylib"))
      for (const folder of ["configs", "src"])
        utils.getSynonyms(
          synonyms,
          `./node_modules/@skylib/${pkg}/${folder}/eslintrc.synonyms.js`,
          core
        );

  return { ...core, ...synonyms };
});
