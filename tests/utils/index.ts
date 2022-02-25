import * as utils from "@/rules/utils";

test("getPackage", () => {
  expect(utils.getPackage("fixtures/corrupted.json")).toStrictEqual({});
  expect(utils.getPackage("fixtures/missing.json")).toStrictEqual({});
});
