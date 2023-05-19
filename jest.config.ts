module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json'
    }
  },
  roots: ['<rootDir>/'],
  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/singleton.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.vue$': '@vue/vue3-jest'
  }
}
