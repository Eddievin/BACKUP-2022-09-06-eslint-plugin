import naturalCompare from "natural-compare";
import type { IndexedObject } from "@skylib/functions";

/**
 * Compares two strings.
 *
 * @param x - Value 1.
 * @param y - Value 2.
 * @returns Comparison result.
 */
export function compare(x: string, y: string): -1 | 0 | 1 {
  return naturalCompare(x.replace(re, callback), y.replace(re, callback));
}

// eslint-disable-next-line @skylib/no-restricted-syntax/prefer-const-object -- Wait for @skylib/config update
const map: IndexedObject<string> = { ".": ":", ":": "." };

const re = /[.:]/gu;

/**
 * Returns replacement character.
 *
 * @param char - Character.
 * @returns Replacement character.
 */
function callback(char: string): string {
  // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style, no-type-assertion/no-type-assertion -- Ok
  return map[char] as string;
}
