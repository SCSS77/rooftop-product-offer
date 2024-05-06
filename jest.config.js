module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testMatch: ['**/__tests__/**/*.spec.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  transformIgnorePatterns: ['/node_modules/'],
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
};

