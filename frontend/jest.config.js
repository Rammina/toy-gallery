module.exports = {
  jest: {
    moduleNameMapper: {
      "\\.(css|less|sass|scss)$": "identity-obj-proxy",
      "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js",
    },
  },
};
