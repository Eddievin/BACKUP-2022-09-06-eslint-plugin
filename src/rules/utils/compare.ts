import type { IndexedObject } from "@skylib/functions";
import naturalCompare from "natural-compare";

/**
 * Compares two strings.
 *
 * @param x - Value 1.
 * @param y - Value 2.
 * @returns Comparison result.
 */
export function compare(x = "", y = ""): -1 | 0 | 1 {
  return naturalCompare(x.replace(re, callback), y.replace(re, callback));
}

const map: IndexedObject<string> = { ":": ".", ".": ":" };

const re = /[.:]/gu;

/**
 * Returns replacement character.
 *
 * @param char - Character.
 * @returns Replacement character.
 */
function callback(char: string): string {
  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
  return map[char] as string;
}
