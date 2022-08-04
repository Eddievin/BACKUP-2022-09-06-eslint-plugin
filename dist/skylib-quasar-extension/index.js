"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skylibQuasarExtension = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const extras_1 = require("./extras");
const no_computed_type_param_1 = require("./no-computed-type-param");
const no_ref_type_param_1 = require("./no-ref-type-param");
const no_ref_undefined_1 = require("./no-ref-undefined");
const require_prop_type_param_1 = require("./require-prop-type-param");
const require_ref_type_param_1 = require("./require-ref-type-param");
const script_1 = require("./script");
const template_1 = require("./template");
const test_utils_1 = require("./test-utils");
exports.skylibQuasarExtension = Object.assign(Object.assign(Object.assign(Object.assign({ "no-computed-type-param": no_computed_type_param_1.noComputedTypeParam, "no-ref-type-param": no_ref_type_param_1.noRefTypeParam, "no-ref-undefined": no_ref_undefined_1.noRefUndefined, "require-prop-type-param": require_prop_type_param_1.requirePropTypeParam, "require-ref-type-param": require_ref_type_param_1.requireRefTypeParam }, utils.prefixKeys(extras_1.extras, "extras/")), utils.prefixKeys(script_1.script, "script/")), utils.prefixKeys(template_1.template, "template/")), utils.prefixKeys(test_utils_1.testUtils, "test-utils/"));
//# sourceMappingURL=index.js.map