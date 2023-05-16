module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  collectCoverage: false,
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testEnvironment: ['node'],
  transform: { '^.+\\.(ts|tsx)$': ['esbuild-jest', { sourcemap: true }] },
  setupFilesAfterEnv: ['./jest.setup.ts', '<rootDir>/singleton.ts'],
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: '__reports__',
        filename: 'jest.html'
      }
    ]
  ]
}
