'use strict';

module.exports = function SaveAs() {
  return require('file-saver').saveAs || function() {};
};
