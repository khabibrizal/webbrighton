module.exports = {
  default: {
    require: [
      'ts-node/register',
      'tsconfig-paths/register',
      './src/steps/**/*.ts',
      './src/support/hooks.ts',
      './src/support/allure-hooks.ts'
    ],
    format: [
      'progress'
      
           
      
    ],
    formatOptions: {
      allure: {
        outputDir: 'allure-results',
        attachments: true,
        disableMochaHooks: true
      }
    },
    paths: ['./src/features/**/*.feature'],

    parallel: 1,
    
  }
};
