// eslint-disable-next-line @skylib/no-sibling-import -- Postponed
const config = require("./jest.config");

module.exports = { ...config, maxWorkers: 8 };
