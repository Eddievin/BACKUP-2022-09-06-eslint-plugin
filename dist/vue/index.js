"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vue = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const component_name_1 = require("./component-name");
const core_1 = require("./core");
const no_complex_return_type_1 = require("./no-complex-return-type");
const no_empty_lines_1 = require("./no-empty-lines");
exports.vue = utils.prefixKeys("vue/", Object.assign(Object.assign({}, core_1.core), { "component-name": component_name_1.componentName, "no-complex-return-type": no_complex_return_type_1.noComplexReturnType, "no-empty-lines": no_empty_lines_1.noEmptyLines }));
//# sourceMappingURL=index.js.map