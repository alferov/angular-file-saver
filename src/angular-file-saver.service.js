'use strict';

module.exports = function FileSaver(Blob, SaveAs, FileSaverUtils) {

  function save(blob, filename) {
    try {
      SaveAs(blob, filename);
    } catch(err) {
      FileSaverUtils.handleErrors(err.message);
    }
  }

  return {

    /**
    * saveAs
    * Immediately starts saving a file, returns undefined.
    *
    * @name saveAs
    * @function
    * @param  {Object} options Set of options such as filename and data.
    * - `filename` (String): Custom filename (extension is optional).
    * - `data` (Blob): A Blob instance.
    *
    * @return {Undefined}
    */

    saveAs: function(options) {
      options = angular.extend({}, options);
      var data = options.data;
      var filename = options.filename;

      if (!FileSaverUtils.isBlobInstance(data)) {
        FileSaverUtils.handleErrors('Data argument should be a blob instance');
      }

      if (!FileSaverUtils.isString(filename)) {
        FileSaverUtils.handleErrors('Filename argument should be a string');
      }

      return save(data, filename);
    }
  };
};
