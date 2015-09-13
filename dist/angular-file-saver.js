(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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



module.exports = angular.module('ngFileSaver', []);

({"angular-file-saver.service":require("./angular-file-saver.service.js"),"blob-polyfill.service":require("./blob-polyfill.service.js"),"file-saver-polyfill.service":require("./file-saver-polyfill.service.js")});

},{"./angular-file-saver.service.js":2,"./blob-polyfill.service.js":3,"./file-saver-polyfill.service.js":4}],2:[function(require,module,exports){
'use strict';

var ngFileSaver = require('./angular-file-saver.module.js');

function handleErrors(msg) {
  throw new Error(msg);
}

function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

function isString(obj) {
  return typeof obj === 'string' || obj instanceof String;
}

function isUndefined(obj) {
  return typeof obj === 'undefined';
}

function FileSaver($window) {
  var saveAs = $window.saveAs;
  var Blob = $window.Blob;

  if (isUndefined(saveAs)) {
    handleErrors('saveAs is not supported. Please include saveAs polyfill');
  }

  if (isUndefined(Blob)) {
    handleErrors('Blob is not supported. Please include blob polyfill');
  }

  function isBlobInstance(obj) {
    return obj instanceof Blob;
  }

  function save(blob, filename) {
    try {
      saveAs(blob, filename);
    } catch(err) {
      handleErrors(err.message);
    }
  }

  return {

    /**
    * saveAs - Immediately starts saving a file, returns undefined.
    *
    * @param  {object} config Set of options such as data, filename
    * and Blob constructor options. Options - optional parameter if data
    * is represented by blob instance
    * @return {undefined}
    */

    saveAs: function(config) {
      config = config || {};
      var data = config.data;
      var filename = config.filename;
      var options = config.options;

      if (!isArray(data) && !isBlobInstance(data)) {
        handleErrors('Data argument should be represented as an array or Blob instance');
      }

      if (!isString(filename)) {
        handleErrors('Filename argument should be a string');
      }

      if (isBlobInstance(data)) {
        return save(data, filename);
      }

      var blob = new Blob(data, options);
      return save(blob, filename);
    }
  };
}

ngFileSaver
  .factory('FileSaver', ['$window', FileSaver]);

},{"./angular-file-saver.module.js":1}],3:[function(require,module,exports){

},{}],4:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"dup":3}]},{},[1]);
