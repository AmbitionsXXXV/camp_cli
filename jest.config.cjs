module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.ts'],
  moduleNameMapper: {
    '^../lib/index.mts$': '<rootDir>/lib/index.mts',
  },
  extensionsToTreatAsEsm: ['.mts'],
  "transform": {
    "^.+\\.(ts|tsx|mts)$": ["ts-jest", {
      tsconfig: {
        // Override the 'noEmit' option from your tsconfig
        noEmit: false,
      }}]
  },
};
