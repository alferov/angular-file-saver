'use strict';

module.exports = function FileSaver(Blob, SaveAs, FileSaverUtils) {

  function isBlobInstance(obj) {
    return obj instanceof Blob;
  }

  function save(blob, filename) {
    try {
      SaveAs(blob, filename);
    } catch(err) {
      FileSaverUtils.handleErrors(err.message);
    }
  }

  return {

    /**
    * saveAs - Immediately starts saving a file, returns undefined.
    *
    * @param  {object} config Set of options such as filename and Blob options.
    * @return {undefined}
    */

    saveAs: function(config) {
      config = angular.extend({}, config);
      var data = config.data;
      var filename = config.filename;

      if (!isBlobInstance(data)) {
        FileSaverUtils.handleErrors('Data argument should be a blob instance');
      }

      if (!FileSaverUtils.isString(filename)) {
        FileSaverUtils.handleErrors('Filename argument should be a string');
      }

      return save(data, filename);
    }
  };
};
