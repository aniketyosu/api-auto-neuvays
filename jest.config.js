/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "./jest-reports",
        outputName: "jest-junit.xml",
        suiteName: "Jest Tests",
        classNameTemplate: "{classname}-{title}",
        titleTemplate: "{title}",
        ancestorSeparator: " › ",
        usePathForSuiteName: "true",
      },
    ],
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
