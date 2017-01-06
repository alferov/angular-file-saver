'use strict';

require('blob-tmp');

module.exports = function Blob($window) {
  return $window.Blob;
};
