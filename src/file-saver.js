/* angular-file-saver
*
* A AngularJS service that implements the HTML5 W3C saveAs() in browsers that
* do not natively support it
*
* (c) 2015 Philipp Alferov
* License: MIT
*
*/

(function() {
  'use strict';

  angular
    .module('fileSaver', [])
    .factory('SaveAs', [SaveAs]);

    function SaveAs () {
      function blobInit(data, type) {
        var blob;

        if (hasBlobSupport()) {
          return new Blob(data, type);
        }

        blob = new BlobBuilder();
        blob.append(data[0]);
        blob = getBlob(type.type);

        return blob;
      }

      function isBlobInstance(data) {
        var blobSupport = hasBlobSupport();

        if (blobSupport && data instanceof Blob) {
          return true;
        }

        //If browser does not suport Blob natively, but the object passed as
        //first argument represented as BlobBuilder polyfill instance
        if (!blobSupport && data instanceof BlobBuilder) {
          return true;
        }

        return false;
      }

      function hasBlobSupport () {
        return typeof(Blob) === "function";
      }

      return {

        /**
        * saveFile - Immediately starts saving a file, returns undefined.
        *
        * @param  {string|array|object} data Data, represented as a string,
        * an array or a Blob object;
        * @param  {string} filename
        * @param  {object} options Set of options for the Blob constructor.
        * Optional parameter, if Blob object is passed as first argument
        * @return {undefined}
        */

        saveFile: function (data, filename, options) {
          var blob;
          options = (typeof options === 'undefined') ? {} : options;

          if (isBlobInstance(data)) {
            return saveAs(data, filename);
          }

          data = data instanceof Array ? data : [data];

          blob = blobInit(data, options);

          return saveAs(blob, filename);
        }

      };
    }

})();
