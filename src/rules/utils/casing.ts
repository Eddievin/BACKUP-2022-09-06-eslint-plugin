import * as _ from "@skylib/lodash-commonjs-es";
import { is, s } from "@skylib/functions";

export enum Format {
  camelCase = "camelCase",
  kebabCase = "kebabCase",
  pascalCase = "pascalCase"
}

export const isFormat = is.factory(is.enumeration, Format);

/**
 * Sets string case.
 *
 * @param str - String.
 * @param caseOption - Case option.
 * @returns String in given case.
 */
export function format(str: string, caseOption: Format): string {
  switch (caseOption) {
    case Format.camelCase:
      return _.camelCase(str);

    case Format.kebabCase:
      return _.kebabCase(str);

    case Format.pascalCase:
      return s.ucFirst(_.camelCase(str));
  }
}
