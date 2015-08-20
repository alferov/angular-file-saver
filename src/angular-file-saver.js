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

    function isBlobInstance (data) {
      return data instanceof Blob;
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
        data = data instanceof Array ? data : [data];

        if (isBlobInstance(data)) {
          save(data, filename);
        }

        blob = new Blob(data, options);
        save(blob, filename);
      }
    };
  }
