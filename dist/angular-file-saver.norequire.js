angular.module('ngFileSaver', [])
  .factory('FileSaver', ['Blob', 'SaveAs', 'FileSaverUtils', FileSaver])
  .factory('FileSaverUtils', FileSaverUtils)
  .factory('Blob', ['$window', 'FileSaverUtils', Blob])
  .factory('SaveAs', ['$window', 'FileSaverUtils', SaveAs]);

function FileSaver(Blob, SaveAs, FileSaverUtils) {

  function save(blob, filename, disableAutoBOM) {
    try {
      SaveAs(blob, filename, disableAutoBOM);
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
    * @param {Blob} data A Blob instance
    * @param {Object} filename Custom filename (extension is optional)
    * @param {Boolean} disableAutoBOM Disable automatically provided Unicode
    * text encoding hints
    *
    * @return {Undefined}
    */

    saveAs: function(data, filename, disableAutoBOM) {

      if (!FileSaverUtils.isBlobInstance(data)) {
        FileSaverUtils.handleErrors('Data argument should be a blob instance');
      }

      if (!FileSaverUtils.isString(filename)) {
        FileSaverUtils.handleErrors('Filename argument should be a string');
      }

      return save(data, filename, disableAutoBOM);
    }
  };
}

function FileSaverUtils() {
  return {
    handleErrors: function(msg) {
      throw new Error(msg);
    },
    isString: function(obj) {
      return typeof obj === 'string' || obj instanceof String;
    },
    isUndefined: function(obj) {
      return typeof obj === 'undefined';
    },
    isBlobInstance: function(obj) {
      return obj instanceof Blob;
    }
  };
}

function Blob($window, FileSaverUtils) {
  var blob = $window.Blob;

  if (FileSaverUtils.isUndefined(blob)) {
    FileSaverUtils.handleErrors('Blob is not supported. Please include blob polyfilll');
  }

  return blob;
}

function SaveAs($window, FileSaverUtils) {
  var saveAs = $window.saveAs;

  if (FileSaverUtils.isUndefined(saveAs)) {
    FileSaverUtils.handleErrors('saveAs is not supported. Please include saveAs polyfill');
  }

  return saveAs;
}
