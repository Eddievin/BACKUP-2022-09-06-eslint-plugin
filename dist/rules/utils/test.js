"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRule = void 0;
const core_1 = require("./core");
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
/**
 * Runs test.
 *
 * @param name - Rule name.
 * @param rules - Rules.
 * @param invalid - Invalid tests.
 * @param valid - Valid tests.
 */
function testRule(name, rules, invalid, valid = []) {
    const rule = rules[name];
    const tester = new utils_1.TSESLint.RuleTester({
        // eslint-disable-next-line unicorn/prefer-module -- Postponed
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
        invalid: invalid.map(invalidTest => {
            var _a, _b;
            const code = functions_1.s.unpadMultiline(invalidTest.code);
            const output = functions_1.s.unpadMultiline((_a = invalidTest.output) !== null && _a !== void 0 ? _a : invalidTest.code);
            return Object.assign(Object.assign({}, invalidTest), { code, filename: `${core_1.base}fixtures/${(_b = invalidTest.filename) !== null && _b !== void 0 ? _b : "file.ts"}`, output });
        }),
        valid: valid.map(validTest => {
            var _a;
            const code = functions_1.s.unpadMultiline(validTest.code);
            return Object.assign(Object.assign({}, validTest), { code, filename: `${core_1.base}fixtures/${(_a = validTest.filename) !== null && _a !== void 0 ? _a : "file.ts"}` });
        })
    });
}
exports.testRule = testRule;
//# sourceMappingURL=test.js.map