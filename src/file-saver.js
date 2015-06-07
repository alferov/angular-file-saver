/* angular-file-saver
*
* Provides integration between FileSaver.js and Angular
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

        if (!blobSupport && data instanceof BlobBuilder) {
          return true;
        }

        return false;
      }

      function hasBlobSupport () {
        return typeof(Blob) === "function";
      }

      return {
        saveFile: function (filename, settings) {
          var data = settings.data;
          var type = settings.options;


          if (isBlobInstance(data)) {
            return saveAs(data, filename);
          }

          var blob = blobInit(data, type);

          return saveAs(blob, filename);
        }

      };
    }

})();
