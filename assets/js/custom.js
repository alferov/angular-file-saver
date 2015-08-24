var angular = require('angular');
var fileSaver = require('../../../src/angular-file-saver');
window.saveAs = require('browser-filesaver');
// window.Blob = require('blob-polyfill');

angular
  .module('ngFileSaver', ['fileSaver'])
  .controller('DownloadText', ['$scope', 'SaveAs', DownloadText]);

function DownloadText($scope, SaveAs) {
  var vm = this;

  vm.val = {
    text: 'Hey ho lets go!'
  };

  vm.download = function(text) {

    var options =  {
      type: "text/plain;charset=utf-8"
    };

    SaveAs.download([text], 'textfile.txt', options);

  };
}
