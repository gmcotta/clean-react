module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/**/*.{ts,tsx}',
    '!<rootDir>/src/**/index.ts',
    '!**/*.d.ts'
  ],
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/src/main/test/cypress'
  ],
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.scss$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts']
}
