'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var watchify = require('watchify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var sequence = require('run-sequence');
var browserSync = require('browser-sync');
var fs = require('fs');
var spawn = require('child_process').spawn;

var config = {
  fileSaver: {
    scripts: './src/*.js'
  },
  docs: {
    root: './docs',
    index: './docs/index.html',
    src: './docs/src',
    styles: './docs/assets/stylesheets/**/*.css',
    markdown: './README.md',
    dest: './docs/dist'
  },
  dest: {
    docs: './docs/dist'
  },
  browserSync: {
    port: '3000',
    server: './docs'
  },
  // Predefined browserify configs to keep tasks DRY
  browserify: {
    fileSaver: {
      entryPoint: './src/angular-file-saver.module.js',
      bundleName: 'angular-file-saver.js',
      dest: './dist'
    },
    fileSaverBundle: {
      entryPoint: './src/angular-file-saver-bundle.module.js',
      bundleName: 'angular-file-saver.bundle.js',
      dest: './dist'
    },
    docs: {
      entryPoint: './docs/assets/js/custom.js',
      bundleName: 'examples.js',
      dest: './docs/dist'
    }
  },
  tests: {
    karma: 'test/karma.conf.js'
  },
  // A flag attribute to switch modes.
  isProd: false
};

var browserifyDefaults = config.browserify.fileSaver;

/**
 * Helpers
 */
function handleErrors(err) {
  $.util.log(err.toString());
  this.emit('end');
}

function fileContents(filePath, file) {
  return file.contents.toString();
}

/**
* Get arguments for release task from CLI
*/
function getUpdateType() {
  var env = $.util.env;

  if (env.type) {
    return { type: env.type };
  }

  if (env.version) {
    return { version: env.version };
  }

  return { type: 'patch' };
}

function getPackageJsonVersion() {
  return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
}

/**
* See http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
*/
function buildScript() {

  var bundler = browserify({
    entries: browserifyDefaults.entryPoint,
    debug: false,
    cache: {},
    packageCache: {},
    fullPaths: false
  });

  function rebundle() {
    var stream = bundler.bundle();

    return stream.on('error', handleErrors)
      .pipe(source(browserifyDefaults.bundleName))
      .pipe(buffer())
      .pipe(gulp.dest(browserifyDefaults.dest))
      .pipe($.if(config.isProd, $.uglify({
        compress: { drop_console: true }
      })))
      .pipe($.if(config.isProd, $.rename({
        suffix: '.min'
      })))
      .pipe($.if(config.isProd, gulp.dest(browserifyDefaults.dest)))
      .pipe($.if(browserSync.active, browserSync.stream()));
  }

  // Watch files for changes and only rebuilds what it needs to
  if (!config.isProd) {
    bundler = watchify(bundler);
    bundler.on('update', function() {
      rebundle();
    });
  }

  return rebundle();
}

gulp.task('scripts', function() {
  return buildScript();
});

gulp.task('styles:docs', function() {

  return gulp.src([
    config.docs.styles
  ])
  .pipe($.concat('examples.css'))
  .pipe(gulp.dest(config.dest.docs))
  .pipe($.if(browserSync.active, browserSync.stream()));
});

gulp.task('serve', function() {

  browserSync({
    port: config.browserSync.port,
    server: {
      baseDir: config.browserSync.server
    },
    logConnections: true,
    logFileChanges: true,
    notify: true
  });
});

gulp.task('markdown', function() {
  var markdown = gulp.src(config.docs.markdown).pipe($.markdown());

  return gulp.src(config.docs.index)
    .pipe($.inject(markdown, {
      transform: fileContents
    }))
    .pipe(gulp.dest(config.docs.root));
});

gulp.task('deploy:docs', function() {
  return gulp.src('./docs/**/*')
    .pipe($.ghPages());
});

gulp.task('build', function(cb) {
  sequence('build:src', 'build:docs', 'build:bundle', cb);
});

gulp.task('build:src', function(cb) {
  config.isProd = true;
  browserifyDefaults = config.browserify.fileSaver;

  sequence('scripts', cb);
});

gulp.task('build:bundle', function(cb) {
  config.isProd = true;
  browserifyDefaults = config.browserify.fileSaverBundle;

  sequence('scripts', cb);
});

gulp.task('build:docs', function(cb) {
  config.isProd = true;
  browserifyDefaults = config.browserify.docs;

  sequence(['scripts', 'styles:docs'], cb);
});

gulp.task('dev:docs', function() {
  config.isProd = false;
  browserifyDefaults = config.browserify.docs;

  sequence('markdown', ['scripts', 'styles:docs'], 'watch:docs');
});

gulp.task('watch:docs', ['serve'], function() {
  gulp.watch(config.docs.styles, ['styles:docs']);
});

gulp.task('release:bump', function() {

  return gulp.src('./*.json')
    .pipe($.bump(getUpdateType()))
    .pipe(gulp.dest('./'));
});

gulp.task('release:commit', ['release:bump'], function(cb) {
  var version = getPackageJsonVersion();

  return gulp.src('.')
    .pipe($.git.add())
    .pipe($.git.commit(':octocat: Bump to ' + version, cb));
});

gulp.task('release:push', ['release:bump', 'release:commit'], function(cb) {
  return $.git.push('origin', 'master', cb);
});

gulp.task('release:tag', ['release:bump', 'release:commit', 'release:push'], function(cb) {
  var version = getPackageJsonVersion();

  return $.git.tag(version, 'Tag: ' + version, function(err) {
    if (err) {
      return cb(err);
    }
    $.git.push('origin', 'master', {args: '--tags'}, cb);
  });
});

gulp.task('unit', function() {
  // Nonsensical source to fall back to files listed in karma.conf.js.
  // See https://github.com/lazd/gulp-karma/issues/9
  return gulp.src('./foobar')
    .pipe($.karma({
      configFile: config.tests.karma,
      action: 'run'
    }))
    .on('error', function(err) {
      throw err;
    });
});

gulp.task('release:npm', ['release:bump', 'release:commit', 'release:push', 'release:tag'], function(done) {
  spawn('npm', ['publish'], { stdio: 'inherit' }).on('close', done);
});

/**
* Automate npm & bower updates.
* $ gulp release --type major - using gulp-bump versioning
* $ gulp release --version 1.1.1 - using explicit version number
*/
gulp.task('release', ['release:bump', 'release:commit', 'release:push', 'release:tag', 'release:npm']);

gulp.task('default', ['build']);
