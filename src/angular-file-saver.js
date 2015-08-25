'use strict';

/* angular-file-saver
*
* A AngularJS service that implements the HTML5 W3C saveAs() in browsers that
* do not natively support it
*
* (c) 2015 Philipp Alferov
* License: MIT
*
*/

angular
  .module('fileSaver', [])
  .factory('SaveAs', SaveAs);

  function SaveAs() {

    function handleErrors (msg) {
      throw new Error(msg);
    }

    function isArray (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    }

    function isObject (obj) {
      return obj !== null && typeof obj === 'object';
    }

    function isString (obj) {
      return typeof obj === 'string' || obj instanceof String;
    }

    function isBlobInstance (obj) {
      return obj instanceof Blob;
    }

    function save(blob, filename) {
      try {
        saveAs(blob, filename);
      } catch(err) {
        console.error(err.message);
      }
    }

    return {

      /**
      * saveFile - Immediately starts saving a file, returns undefined.
      *
      * @param  {array|Blob} data Represented as an array or a Blob object
      * @param  {string} filename
      * @param  {object} options Set of Blob constructor options.
      * Optional parameter, if Blob object is passed as first argument
      * @return {undefined}
      */

      download: function (data, filename, options) {
        var blob;

        if (!isArray(data) || !isBlobInstance(data)) {
          handleErrors('Data argument should be represented as an array or Blob instance');
        }

        if (!isString(filename)) {
          handleErrors('Filename argument should be a string');
        }

        if (!isObject(options)) {
          handleErrors('Options argument should be an object');
        }

        if (isBlobInstance(data)) {
          return save(data, filename);
        }

        blob = new Blob(data, options);
        return save(blob, filename);
      }
    };
  }
