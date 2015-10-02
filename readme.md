Angular File Saver [![Build Status](https://travis-ci.org/alferov/angular-file-saver.svg)](https://travis-ci.org/alferov/angular-file-saver)
=========

Angular-file-saver is an AngularJS service that leverages
[FileSaver.js](https://github.com/eligrey/FileSaver.js/) and
[Blob.js](https://github.com/eligrey/Blob.js/) to implement the HTML5 W3C
saveAs() interface in browsers that do not natively support it.

## Dependencies
- [AngularJS](https://github.com/angular/angular.js)
- [FileSaver.js](https://github.com/eligrey/FileSaver.js/)
- [Blob.js](https://github.com/eligrey/Blob.js/)

File `dist/angular-file-saver.bundle.js` contains all required dependencies and
grants access to both `Blob.js` and `FileSaver.js` polyfills via `Blob` and
`SaveAs` services.

## Installation
Using bower:
```
$ bower install angular-file-saver
```
Using npm:
```
$ npm install angular-file-saver
```

## Basic usage
- Include the `ngFileSaver` module into your project;
- Pass both `FileSaver` and `Blob` services as dependencies;
- Create a [Blob object](https://developer.mozilla.org/en/docs/Web/API/Blob)
passing an array with data as a first argument and an object with set of options
as the second one: `new Blob(['text'], { type: 'text/plain;charset=utf-8' })`;
- Invoke `FileSaver.saveAs` with the following arguments:
  - `data` - a Blob object instance;
  - `filename`;

## Example
**JS**
```js
function ExampleCtrl(FileSaver, Blob) {
  var vm = this;

  vm.val = {
    text: 'Hey ho lets go!'
  };

  vm.download = function(text) {

    var data = new Blob(['text'], { type: 'text/plain;charset=utf-8' });

    var config = {
      data: data,
      filename: 'textfile.txt'
    };

    FileSaver.saveAs(config);
  };
}

angular
  .module('fileSaverExample', ['ngFileSaver'])
  .controller('ExampleCtrl', ['FileSaver', 'Blob', ExampleCtrl]);
```

**HTML**
```html
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
