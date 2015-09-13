'use strict';

require('FileSaver.js');

module.exports = function SaveAs($window) {
  return $window.saveAs;
};
