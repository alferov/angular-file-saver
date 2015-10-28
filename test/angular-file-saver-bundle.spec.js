'use strict';

describe('angular-file-saver', function() {

  var FileSaver, Blob;

  beforeEach(function() {
    angular.mock.module('ngFileSaver');
    angular.mock.inject(function(_FileSaver_, _Blob_) {
      FileSaver = _FileSaver_;
      Blob = _Blob_;
    });
  });

  describe('#saveAs', function() {

    it('should throw an error if there are no arguments', function() {
      expect(FileSaver.saveAs)
        .toThrowError(/should be a blob instance/);
    });

    it('should throw an error if `data` is not a blob', function() {
      var data = ['text'];
      var filename = 'xfiles.txt';

      expect(FileSaver.saveAs.bind(FileSaver, data, filename))
        .toThrowError(/should be a blob instance/);
    });

    it('should throw an error if `filename` is not a string', function() {
      var data = new Blob(['text'], { type: 'text/plain;charset=utf-8' });

      expect(FileSaver.saveAs.bind(FileSaver, data, null))
        .toThrowError(/should be a string/);
    });

    it('should save a file if provided data is valid', function() {
      var data = new Blob(['text'], { type: 'text/plain;charset=utf-8' });

      expect(FileSaver.saveAs.bind(FileSaver, data, 'xfiles.txt')).not.toThrow();
    });

  });

});
