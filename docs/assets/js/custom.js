'use strict'
var angular = require('angular');
require('../../../src/angular-file-saver-bundle.module');

function DownloadText(FileSaver) {
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
  .controller('DownloadText', ['FileSaver', DownloadText]);
