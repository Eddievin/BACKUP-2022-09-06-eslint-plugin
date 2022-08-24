export declare const configs: {
    readonly all: {
        readonly plugins: readonly ["@skylib/eslint-plugin"];
        readonly rules: {
            readonly "@skylib/match-filename": "off";
            readonly "@skylib/no-restricted-syntax": "off";
            readonly "@skylib/require-syntax": "off";
            readonly "@skylib/wrap": "off";
        };
    };
    readonly config: {
        readonly plugins: readonly ["@skylib/eslint-plugin"];
        readonly rules: object;
    };
    readonly eslintrc: {
        readonly plugins: readonly ["@skylib/eslint-plugin"];
        readonly rules: object;
    };
    readonly facades: {
        readonly plugins: readonly ["@skylib/eslint-plugin"];
        readonly rules: object;
    };
    readonly framework: {
        readonly plugins: readonly ["@skylib/eslint-plugin"];
        readonly rules: object;
    };
    readonly functions: {
        readonly overrides: readonly [{
            readonly files: "./tests/**";
            readonly rules: object;
        }];
        readonly plugins: readonly ["@skylib/eslint-plugin"];
        readonly rules: object;
    };
    readonly "functions/jest": {
        readonly plugins: readonly ["@skylib/eslint-plugin"];
        readonly rules: object;
    };
    readonly "functions/misc": {
        readonly plugins: readonly ["@skylib/eslint-plugin"];
        readonly rules: object;
    };
    readonly jest: {
        readonly plugins: readonly ["@skylib/eslint-plugin"];
        readonly rules: object;
    };
    readonly "quasar-extension": {
        readonly overrides: readonly [{
            readonly files: "*.extras";
            readonly rules: object;
        }, {
            readonly files: "*.vue";
            readonly rules: object;
        }, {
            readonly files: "./tests/**";
            readonly rules: object;
        }];
        readonly plugins: readonly ["@skylib/eslint-plugin"];
        readonly rules: object;
    };
    readonly "quasar-extension/extras": {
        readonly plugins: readonly ["@skylib/eslint-plugin"];
        readonly rules: object;
    };
    readonly "quasar-extension/jest": {
        readonly plugins: readonly ["@skylib/eslint-plugin"];
        readonly rules: object;
    };
    readonly "quasar-extension/misc": {
        readonly plugins: readonly ["@skylib/eslint-plugin"];
        readonly rules: object;
    };
    readonly "quasar-extension/vue": {
        readonly plugins: readonly ["@skylib/eslint-plugin"];
        readonly rules: object;
    };
    readonly typescript: {
        readonly plugins: readonly ["@skylib/eslint-plugin"];
        readonly rules: {
            readonly "@skylib/typescript/no-restricted-syntax": "off";
        };
    };
    readonly vue: {
        readonly plugins: readonly ["@skylib/eslint-plugin"];
        readonly rules: {
            readonly "@skylib/typescript/no-complex-declarator-type": "off";
            readonly "@skylib/typescript/no-complex-return-type": "off";
        };
    };
};
//# sourceMappingURL=configs.d.ts.map