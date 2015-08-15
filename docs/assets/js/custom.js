var angular = require('angular');
var fileSaver = require('../../../src/file-saver');
window.saveAs = require('browser-filesaver');

angular
  .module('ngFileSaver', ['fileSaver'])
  .controller('DownloadText', ['$scope', 'SaveAs', DownloadText]);
console.log(angular);
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
