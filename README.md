angular-file-saver
=========
Angular-file-saver is an AngularJS service that leverage
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
- Include the `fileSaver` module to your project;
- Pass `SaveAs` service as a dependency;
- Invoke `SaveAs.download()` with the following arguments:
  - `data` - data, represented as an array or a [Blob object](https://developer.mozilla.org/en/docs/Web/API/Blob);
  - `filename`
  - `options` - a set of options for the [Blob constructor](https://developer.mozilla.org/en/docs/Web/API/Blob)

## Demo
[Demo on the github project  page](http://alferov.github.io/angular-file-saver/#demo)
