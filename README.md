angular-file-saver
=========
Angular-file-saver is an AngularJS service that leverages
[FileSaver.js](https://github.com/eligrey/FileSaver.js/) and
[Blob.js](https://github.com/eligrey/Blob.js/) to implement the HTML5 W3C
saveAs() FileSaver interface in browsers that do not natively support it.

## Dependencies
- [AngularJS](https://github.com/angular/angular.js)
- [FileSaver.js](https://github.com/eligrey/FileSaver.js/)
- [Blob.js](https://github.com/eligrey/Blob.js/)

## Installation
Using bower
```
$ bower install angular-file-saver
```
Using npm
```
$ npm install angular-file-saver
```

## Basic usage
- Include the `ngFileSaver` module to your project;
- Pass `FileSaver` service as a dependency;
- Invoke `FileSaver.saveAs` and pass an object with the following set of options:
  - `data` - data, represented as an array or a [Blob object](https://developer.mozilla.org/en/docs/Web/API/Blob);
  - `filename`;
  - `options` - a set of options for the [Blob constructor](https://developer.mozilla.org/en/docs/Web/API/Blob)(optional attribute);

## Example
```
function ExampleCtrl($scope, FileSaver) {
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
  .controller('ExampleCtrl', ['$scope', 'FileSaver', ExampleCtrl]);
```

## Demo
[Demo on the github project page](http://alferov.github.io/angular-file-saver/#demo)
