Angular File Saver
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
Using bower:
```
$ bower install angular-file-saver
```
Using npm:
```
$ npm install angular-file-saver
```

`dist/angular-file-saver.bundle.js` contains all required dependencies and grants access to both `Blob.js` and `FileSaver.js` polyfills via `Blob` and `SaveAs` services (include `ngFileSaver` module as a dependency first).

## Basic usage
- Include the `ngFileSaver` module to your project;
- Pass `FileSaver` service as a dependency;
- Invoke `FileSaver.saveAs` and pass an object with the following set of options:
  - `data` - data, represented as an array or a [Blob object](https://developer.mozilla.org/en/docs/Web/API/Blob);
  - `filename`;
  - `options` - a set of options for the [Blob constructor](https://developer.mozilla.org/en/docs/Web/API/Blob)(optional attribute);

## Example
**JS**
```
function ExampleCtrl(FileSaver) {
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
  .controller('ExampleCtrl', [FileSaver', ExampleCtrl]);
```

**HTML**
```
<div class="wrapper" ng-controller="ExampleCtrl as vm">
  <textarea
    ng-model="vm.val.text"
    ng-model-options="{ getterSetter: true }"
    name="textarea" rows="5" cols="20">
      Hey ho let's go!
  </textarea>
  <a href="" class="btn btn-dark btn-small" ng-click="vm.download(vm.val.text)">
    Download
  </a>
</div>
```
## Demo
[Demo on `gh-pages`](http://alferov.github.io/angular-file-saver/#demo)
