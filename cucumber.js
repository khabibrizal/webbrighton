module.exports = {
  default: {
    require: [
      'ts-node/register',
      'tsconfig-paths/register',
      './src/support/world.ts',
      './src/support/hooks.ts',
      './src/support/allure-hooks.ts',
      './src/steps/**/*.ts'
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
    publishQuiet: true
    
  }
};
