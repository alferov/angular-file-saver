'use strict';

var ngFileSaver = require('../angular-file-saver.module');

function SaveAs($window) {
  return $window.saveAs;
}

ngFileSaver
  .factory('SaveAs', ['$window', SaveAs]);
