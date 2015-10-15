'use strict';

module.exports = function FileSaver(Blob, SaveAs, FileSaverUtils) {
  if (SaveAs === null) {
    return {
      saveAs: null
    };
  }

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
    * @param  {object} options Set of options such as filename and data.
    * @return {undefined}
    *
    * ##### Params on the `options` object:
    * - filename (string): Custom filename (extension is optional).
    * - data (Blob): A Blob instance.
    */

    saveAs: function(options) {
      options = angular.extend({}, options);
      var data = options.data;
      var filename = options.filename;

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
