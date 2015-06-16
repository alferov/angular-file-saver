(function() {

  angular
    .module('ngFileSaver', ['fileSaver'])
    .controller('DownloadText', DownloadText);

  function DownloadText($scope, SaveAs) {
    var vm = this;

    vm.val = {
      text: 'Hey ho lets go!'
    };

    vm.download = function(text) {

      SaveAs.saveFile([text], 'textfile.txt', {
        type: "text/plain;charset=utf-8"
      });

    };
  }

})();
