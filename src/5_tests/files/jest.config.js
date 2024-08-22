module.exports = {
  transform: {
    "^.+\\.ts$": ["ts-jest", { tsconfig: "tsconfig.json" }],
  },
  coverageReporters: ["text", "html"],
  collectCoverage: false,
  coverageDirectory: "<rootDir>/coverage",
  rootDir: "../../../.",
  testMatch: ["<rootDir>/src/5_tests/**/*.spec.ts"],
  setupFiles: ["<rootDir>/src/5_tests/files/jest.setup.ts"],
  reporters: ["default"],
  moduleDirectories: ["node_modules", "src"],
  preset: "ts-jest",
  testEnvironment: "node",
};
