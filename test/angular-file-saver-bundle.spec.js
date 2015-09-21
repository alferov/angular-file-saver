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

  describe('passed arguments are correct', function() {

    it('should throw an error if provided data is an array', function() {
      var config = {
        data: ['text'],
        filename: 'xfiles.txt'
      };

      expect(function() { FileSaver.saveAs(config); }).toThrow();
    });

    it('should save a file if provided data is a blob', function() {
      var data = new Blob(['text'], { type: 'text/plain;charset=utf-8' });

      var config = {
        data: data,
        filename: 'xfiles.txt'
      };

      expect(function() { FileSaver.saveAs(config); }).not.toThrow();
    });

  });
});
