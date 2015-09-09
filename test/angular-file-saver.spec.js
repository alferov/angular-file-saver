'use strict';

describe('angular-file-saver', function() {

  var SaveAs, $window, Blob, options, filename;
  beforeEach(module('fileSaver'));

  beforeEach(inject(function(_SaveAs_, _$window_) {
    SaveAs = _SaveAs_;
    $window = _$window_;
    Blob = $window.Blob;
  }));

  it('should not throw an error if dependencies are defined', function() {
    expect($window.saveAs).toBeDefined();
    expect($window.Blob).toBeDefined();
  });

  describe('passed arguments are correct', function() {

    beforeEach(function() {
      options = { type: 'text/plain;charset=utf-8' };
      filename = 'xfiles.txt';
    });

    it('should save a file if provided data is an array', function() {
      var data = ['text'];

      expect(function() {
        SaveAs.download(data, filename, options);
      }).not.toThrow();
    });

    it('should save a file if provided data is a blob', function() {
      var data = new Blob(['text'], options);
      console.log(data instanceof Blob);
      expect(function() {
        SaveAs.download(data, filename);
      }).not.toThrow();
    });

    it('should save a file if options object is not passed', function() {
      var data = ['text'];



      expect(function() {
        SaveAs.download(data, filename);
      }).not.toThrow();
    });

  });
});
