/* eslint-disable github/unescaped-html-literal -- Postponed */
/* eslint-disable xss/no-mixed-html -- Postponed */

module.exports = {
  // eslint-disable-next-line no-warning-comments -- Wait for @skylib/config update
  // fixme
  moduleNameMapper: {
    [/^@$/u.source]: "<rootDir>/src",
    [/^@\/(.+)/u.source]: "<rootDir>/src/$1",
    [/^quasar$/u.source]: "quasar/dist/quasar.esm.prod.js"
  },
  preset: "@skylib/config/jest"
};
