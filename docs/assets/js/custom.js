var angular = require('angular');
var fileSaver = require('../../../src/angular-file-saver.module');
window.saveAs = require('FileSaver.js').saveAs;

function DownloadText($scope, FileSaver) {
  var vm = this;

  vm.val = {
    text: 'Hey ho lets go!'
  };

  vm.download = function(text) {

    var config = {
      data: [text],
      filename: 'textfile.txt',
      options: {
        type: 'text/plain;charset=utf-8'
      }
    };

    FileSaver.saveAs(config);
  };
}

angular
  .module('fileSaverExample', ['ngFileSaver'])
  .controller('DownloadText', ['$scope', 'FileSaver', DownloadText]);
