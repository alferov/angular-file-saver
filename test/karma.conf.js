'use strict';

module.exports = function(config) {
  config.set({
    basePath: '../',
    frameworks: ['jasmine', 'browserify'],
    preprocessors: {
      'src/**/*.js': ['browserify']
    },
    browsers: ['Chrome'],
    reporters: ['progress'],
    autoWatch: true,
    browserify: {
      debug: true,
      transform: []
    },
    proxies: {
      '/': 'http://localhost:9876/'
    },
    urlRoot: '/__karma__/',
    files: [
      './node_modules/angular/angular.js',
      './node_modules/angular-mocks/angular-mocks.js',
      './src/angular-file-saver.js',
      // Test files
      'test/**/*.js'
    ]
  });
};
