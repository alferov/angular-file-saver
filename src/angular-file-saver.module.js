'use strict';

/*
*
* A AngularJS module that implements the HTML5 W3C saveAs() in browsers that
* do not natively support it
*
* (c) 2015 Philipp Alferov
* License: MIT
*
*/

var bulk = require('bulk-require');

module.exports = angular.module('ngFileSaver', []);

bulk(__dirname, ['./**/!(*.module).js']);
