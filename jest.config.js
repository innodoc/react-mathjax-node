module.exports = {
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.js'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  transformIgnorePatterns: ['/node_modules/(?!mathjax-full).+\\.js$'],
}
