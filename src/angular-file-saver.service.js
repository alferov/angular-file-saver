'use strict';

var ngFileSaver = require('./angular-file-saver.module');

function FileSaver(Blob, SaveAs, FileSaverUtils) {

  if (FileSaverUtils.isUndefined(FileSaver)) {
    FileSaverUtils.handleErrors('saveAs is not supported. Please include saveAs polyfill');
  }

  if (FileSaverUtils.isUndefined(Blob)) {
    FileSaverUtils.handleErrors('Blob is not supported. Please include blob polyfill');
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

      if (!FileSaverUtils.isArray(data) && !isBlobInstance(data)) {
        FileSaverUtils.handleErrors('Data argument should be represented as an array or Blob instance');
      }

      if (!FileSaverUtils.isString(filename)) {
        FileSaverUtils.handleErrors('Filename argument should be a string');
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
  .factory('FileSaver', ['Blob', 'SaveAs', 'FileSaverUtils', FileSaver]);
