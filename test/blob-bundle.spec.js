'use strict';

describe('blob', function() {

  var Blob, oMyBlob;

  beforeEach(function() {

    angular.mock.module('ngFileSaver');

    angular.mock.inject(function(_Blob_) {
      Blob = _Blob_;
    });
  });

  it('should create valid blob instances', function() {
    var text = ['Hello'];
    oMyBlob = new Blob(text, { type: 'text/html' });
    expect(oMyBlob).toEqual(jasmine.any(Blob));
  });

});
