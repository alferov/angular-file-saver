'use strict';

module.exports = function FileSaverUtils() {
  return {
    handleErrors: function(msg) {
      throw new Error(msg);
    },
    isArray: function isArray(obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    },
    isObject: function(obj) {
      return obj !== null && typeof obj === 'object';
    },
    isString: function(obj) {
      return typeof obj === 'string' || obj instanceof String;
    },
    isUndefined: function isUndefined(obj) {
      return typeof obj === 'undefined';
    }
  };
};
