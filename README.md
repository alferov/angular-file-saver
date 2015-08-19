angular-file-saver
=========
Angular file saver is an AngularJS service that provides integration between  [FileSaver.js](https://github.com/eligrey/FileSaver.js/) and AngularJS. FileSaver.js implements the
HTML5 W3C saveAs() FileSaver interface in browsers that do not natively support
it. The package also comes with [Blob.js](https://github.com/eligrey/Blob.js/)
as a dependency to provide support of wide range of browsers.

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

- Include the <code>fileSaver</code> module to yor project;

- Pass <code>SaveAs</code> service as a dependency;

- Invoke <code>SaveAs.download()</code> with following arguments:

  - `data` - data, represented as a string, an array or a [Blob object](https://developer.mozilla.org/en/docs/Web/API/Blob);
  - `filename`
  - `options` - set of options for the [Blob constructor](https://developer.mozilla.org/en/docs/Web/API/Blob) optional parameter if Blob object is passed as first argument)

## Demo

[Demo on the github project  page](http://alferov.github.io/angular-file-saver/#demo)
