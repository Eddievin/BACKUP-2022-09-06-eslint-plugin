import { is } from "@skylib/functions";
export declare enum Format {
    camelCase = "camelCase",
    kebabCase = "kebabCase",
    pascalCase = "pascalCase"
}
export declare const isFormat: is.Guard<Format>;
/**
 * Sets string case.
 *
 * @param str - String.
 * @param caseOption - Case option.
 * @returns String in given case.
 */
export declare function format(str: string, caseOption: Format): string;
//# sourceMappingURL=casing.d.ts.map