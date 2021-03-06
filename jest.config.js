module.exports = {
  preset: "jest-preset-angular",
  roots: ["src"],
  setupFilesAfterEnv: ["./src/setup-jest.ts"],
  verbose: false,
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    "node_modules",
    "interfaces",
    ".module.ts",
    "<rootDir>/src/app/main.ts",
    ".mock.ts",
    ".html",
    "environment",
    "test",
  ],
  reporters: ["default"],
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.spec.json",
      stringifyContentPathRegex: "\\.(html|sbg)$",
      asyTransformers: {
        before: [
          "jest-preset-angular/build/InlineFilesTransformer",
          "jest-preset-angular/build/StripStylesTransformer",
        ],
      },
    },
  },
  transform: {
    "^.+\\.(ts|js|html|svg)$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js", "html", "svg"],
  moduleNameMapper: {
    "/^app/(.*)$/": "./src/app/$1",
  },
  resolver: null,
};
