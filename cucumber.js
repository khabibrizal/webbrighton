
module.exports = {
  default: {
    require: [
      'ts-node/register',
      'tsconfig-paths/register',
      './src/support/world.ts',
      './src/support/hooks.ts',
      './src/steps/**/*.ts'
    ],
    //requireModule: ['ts-node/register'],
    format: [
      'progress'
      //'allure-cucumberjs/reporter'
    ],
    formatOptions: {
      //resultsDir: 'allure-results'
    },
     paths: ['./src/features/**/*.feature'],
    parallel: 1,
    publishQuiet: true
  }
};
