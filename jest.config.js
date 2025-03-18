/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "./jest-html-report",
        filename: "report.html",
        openReport: true, // Automatically opens report after test run
      },
    ],
  ],
};
