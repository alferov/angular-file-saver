'use strict';

var ngFileSaver = require('../angular-file-saver.module');

function Blob($window) {
  return $window.Blob;
}

ngFileSaver
  .factory('Blob', ['$window', Blob]);
