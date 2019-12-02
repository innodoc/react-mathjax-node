module.exports = {
  testEnvironment: 'enzyme',
  roots: ['src'],
  collectCoverageFrom: ['src/**/*.js'],
  setupFilesAfterEnv: ['<rootDir>/enzyme.config.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  verbose: true,
}
