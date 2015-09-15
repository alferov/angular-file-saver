'use strict';

describe('file-saver', function() {

  var SaveAs;

  beforeEach(function() {

    angular.mock.module('ngFileSaver');

    angular.mock.inject(function(_SaveAs_) {
      SaveAs = _SaveAs_;
    });
  });

  it('should exist', function() {
    expect(SaveAs).toBeDefined();
  });

  it('should be a function', function() {
    expect(SaveAs).toEqual(jasmine.any(Function));
  });
});
