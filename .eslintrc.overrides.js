module.exports = {
  extends: [
    "plugin:@skylib/functions",
    "./node_modules/@skylib/config/src/eslintrc/options/allow-nodejs-modules",
    "./node_modules/@skylib/config/src/eslintrc/options/allow-type-assertions",
    "./node_modules/@skylib/config/src/eslintrc/options/allow-require",
    "./node_modules/@skylib/config/src/eslintrc/options/allow-require-unsafe"
  ]
};
