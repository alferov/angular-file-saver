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
    autoWatch: false,
    browserify: {
      debug: true,
      transform: [
        'bulkify'
      ]
    },
    proxies: {
      '/': 'http://localhost:9876/'
    },
    urlRoot: '/__karma__/',
    singleRun: true,
    files: [
      './node_modules/Blob.js/Blob.js',
      './node_modules/FileSaver.js/FileSaver.js',
      './node_modules/angular/angular.js',
      './node_modules/angular-mocks/angular-mocks.js',
      'src/angular-file-saver.module.js',
      // Test files
      'test/**/*.js'
    ]
  });
};
