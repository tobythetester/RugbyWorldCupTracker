exports.config = {

  allScriptsTimeout: 11000,
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['checkStatus.js'],
  capabilities: {
    'browserName': 'firefox'
  },

  //baseUrl: 'http://localhost:8000/app/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 900000000
  },

  params: {
    'userName' : 'toby_toblorone@hotmail.com',
    'password' : 'coopers'

  }
};