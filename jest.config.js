module.exports = {
  preset: 'react-native',
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  collectCoverage: true,
  moduleDirectories: ['node_modules', 'components'],
  // transformIgnorePatterns: ['node_modules/(?!(jest-)?react-native)'],
  coveragePathIgnorePatterns: ['/node_modules/', '/jest', 'assets', 'lib'],
  modulePathIgnorePatterns: ['package', 'assets', 'lib'],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|react-navigation-tabs' +
      '|react-native-screens' +
      '|react-navigation' +
      '|@react-navigation' +
      ')/)',
  ],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
};
