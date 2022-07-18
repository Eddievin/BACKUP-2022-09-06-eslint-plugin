"use strict";
/* eslint-disable @skylib/custom/no-literal-union-type -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRule = void 0;
const utils_1 = require("@typescript-eslint/utils");
const core_1 = require("./core");
const functions_1 = require("@skylib/functions");
/**
 * Runs test.
 *
 * @param name - Name.
 * @param rule - Rule.
 * @param invalid - Invalid tests.
 * @param valid - Valid tests.
 */
function testRule(name, rule, invalid, valid = []) {
    const tester = new utils_1.TSESLint.RuleTester({
        parser: require.resolve("vue-eslint-parser"),
        parserOptions: {
            ecmaFeatures: { jsx: true },
            ecmaVersion: 2017,
            extraFileExtensions: [".vue"],
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- Postponed
            // @ts-expect-error
            parser: "@typescript-eslint/parser",
            project: "./tsconfig.json",
            sourceType: "module",
            tsconfigRootDir: `${core_1.base}fixtures`
        }
    });
    tester.run(name, rule, {
        invalid: invalid.map((invalidTest) => {
            var _a, _b;
            const code = functions_1.s.unpadMultiline(invalidTest.code);
            const output = functions_1.s.unpadMultiline((_a = invalidTest.output) !== null && _a !== void 0 ? _a : invalidTest.code);
            const errors = invalidTest.errors.map((error) => { var _a; return (Object.assign({ endLine: (_a = error.line) !== null && _a !== void 0 ? _a : 1 }, error)); });
            return Object.assign(Object.assign({}, invalidTest), { code,
                errors, filename: `${core_1.base}fixtures/${(_b = invalidTest.filename) !== null && _b !== void 0 ? _b : "file.ts"}`, output });
        }),
        valid: valid.map((validTest) => {
            var _a;
            const code = functions_1.s.unpadMultiline(validTest.code);
            return Object.assign(Object.assign({}, validTest), { code, filename: `${core_1.base}fixtures/${(_a = validTest.filename) !== null && _a !== void 0 ? _a : "file.ts"}` });
        })
    });
}
exports.testRule = testRule;
//# sourceMappingURL=test.js.map