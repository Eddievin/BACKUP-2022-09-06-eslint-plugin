export declare const configs: {
    readonly all: {
        readonly plugins: readonly ["@skylib/eslint-plugin"];
        readonly rules: {
            readonly "@skylib/disallow-import": "off";
            readonly "@skylib/match-filename": "off";
            readonly "@skylib/require-syntax": "off";
            readonly "@skylib/restrict-syntax": "off";
            readonly "@skylib/sort-array": "off";
            readonly "@skylib/wrap": "off";
        };
    };
    readonly eslintrc: {
        readonly plugins: readonly ["@skylib/eslint-plugin"];
        readonly rules: object;
    };
    readonly jest: {
        readonly plugins: readonly ["@skylib/eslint-plugin"];
        readonly rules: object;
    };
    readonly "skylib-config": {
        readonly plugins: readonly ["@skylib/eslint-plugin"];
        readonly rules: object;
    };
    readonly "skylib-facades": {
        readonly plugins: readonly ["@skylib/eslint-plugin"];
        readonly rules: object;
    };
    readonly "skylib-functions": {
        readonly plugins: readonly ["@skylib/eslint-plugin"];
        readonly rules: object;
    };
    readonly "skylib-quasar-extension": {
        readonly plugins: readonly ["@skylib/eslint-plugin"];
        readonly rules: object;
    };
    readonly typescript: {
        readonly plugins: readonly ["@skylib/eslint-plugin"];
        readonly rules: {
            readonly "@skylib/typescript/restrict-syntax": "off";
        };
    };
    readonly vue: {
        readonly plugins: readonly ["@skylib/eslint-plugin"];
        readonly rules: {
            readonly "@skylib/typescript/no-complex-return-type": "off";
        };
    };
};
//# sourceMappingURL=configs.d.ts.map