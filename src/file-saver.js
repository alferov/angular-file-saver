/* angular-file-saver
*
* Provides integration between FileSaver.js (implements HTML5 saveAs())
* and angular
*
* (c) 2015 Philipp Alferiov
* License: MIT
*
*/

(function(angular, BlobBuilder, saveAs) {

  angular
    .module('fileSaver', [])
    .factory('SaveAs', [SaveAs]);

    function SaveAs () {
      function handleBlob () {
        // body...
      }
      return {
        saveFile: function() {
          if (typeof(Blob) === "function") {

          }
        }

      };

    }



})(angular, BlobBuilder, saveAs);
