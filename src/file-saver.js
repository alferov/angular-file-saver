/* angular-file-saver
*
* Provides integration between FileSaver.js (implements HTML5 saveAs())
* and angular
*
* (c) 2015 Philipp Alferiov
* License: MIT
*
*/

(function() {
  'use strict';

  angular
    .module('fileSaver', [])
    .factory('SaveAs', [SaveAs]);

    function SaveAs () {
      function handleBlob(data, type) {
        var blob;

        if (typeof(Blob) === "function") {
          return new Blob(data, type);
        }

        blob = new BlobBuilder();
        blob.append(data[0]);
        blob = getBlob(type.type);

        return blob;
      }

      return {
        saveFile: function (data, type, filename) {
          if (data instanceof Blob) {
            //TODO: implement Blob instance support
          }
          var blob = handleBlob(data, type);

          saveAs(blob, filename);
        }

      };
    }

})();
