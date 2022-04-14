import { utils } from "@";

test("getPackage", () => {
  expect(utils.getPackage("fixtures/corrupted.json")).toStrictEqual({});
  expect(utils.getPackage("fixtures/missing.json")).toStrictEqual({});
});
