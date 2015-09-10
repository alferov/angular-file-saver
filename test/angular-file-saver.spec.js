'use strict';

describe('angular-file-saver', function() {

  var FileSaver, $window, Blob, config;
  beforeEach(module('ngFileSaver'));

  beforeEach(inject(function(_FileSaver_, _$window_) {
    FileSaver = _FileSaver_;
    $window = _$window_;
    Blob = $window.Blob;
  }));

  it('should not throw an error if dependencies are defined', function() {
    expect($window.saveAs).toBeDefined();
    expect($window.Blob).toBeDefined();
  });

  describe('passed arguments are correct', function() {

    beforeEach(function() {
      config = {
        filename: 'xfiles.txt',
        options: {
          type: 'text/plain;charset=utf-8'
        }
      };
    });

    it('should save a file if provided data is an array', function() {
      config.data = ['text'];

      expect(function() {
        FileSaver.saveAs(config);
      }).not.toThrow();
    });

    it('should save a file if provided data is a blob', function() {
      config.data = new Blob(['text'], config.options);

      expect(function() {
        FileSaver.saveAs(config);
      }).not.toThrow();
    });

    it('should save a file if options object is not passed', function() {
      config.data = ['text'];

      expect(function() {
        FileSaver.saveAs(config);
      }).not.toThrow();
    });

  });
});
