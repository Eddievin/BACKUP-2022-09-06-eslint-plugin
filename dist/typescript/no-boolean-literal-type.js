"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noBooleanLiteralType = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.noBooleanLiteralType = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "boolean" type instead',
            selector: "TSPropertySignature[optional=true] > TSTypeAnnotation > TSLiteralType.typeAnnotation > Literal[value=/^(?:true|false)$/u]"
        }
    ],
    docs: {
        description: "Disallows boolean literal type.",
        failExamples: `
      interface I {
        x?: true;
        y?: false;
      }
    `,
        passExamples: `
      interface I {
        x?: boolean;
      }
    `
    }
});
//# sourceMappingURL=no-boolean-literal-type.js.map