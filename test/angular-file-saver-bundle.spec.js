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

    it('should throw an error if `options.data` is not a blob', function() {
      var config = {
        data: ['text'],
        filename: 'xfiles.txt'
      };
      expect(function() { FileSaver.saveAs(config); })
        .toThrowError(/should be a blob instance/);
    });

    it('should throw an error if `options` object is empty', function() {
      var config = {};
      expect(function() { FileSaver.saveAs(config); })
        .toThrowError(/should be a blob instance/);
    });

    it('should throw an error if `options` object is not passed', function() {
      expect(function() { FileSaver.saveAs(); })
        .toThrowError(/should be a blob instance/);
    });

    it('should throw an error if `options.filename` is not a string', function() {
      var data = new Blob(['text'], { type: 'text/plain;charset=utf-8' });
      var config = {
        data: data,
        filename: null
      };

      expect(function() { FileSaver.saveAs(config); })
        .toThrowError(/should be a string/);
    });

    it('should save a file if provided data is valid', function() {
      var data = new Blob(['text'], { type: 'text/plain;charset=utf-8' });
      var config = {
        data: data,
        filename: 'xfiles.txt'
      };

      expect(function() { FileSaver.saveAs(config); }).not.toThrow();
    });

  });

});
