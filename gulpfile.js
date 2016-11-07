var gulp = require('gulp');

var angularTemplateCache = require('gulp-angular-templatecache');
var argv = require('yargs').argv;
var bowerFiles = require('main-bower-files');
var clean = require('gulp-clean');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var debug = require('gulp-debug');
var es = require('event-stream');
var inject = require('gulp-inject');
var gulpif = require('gulp-if');
var merge = require('deepmerge');
var order = require("gulp-order");
var path = require('path');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');


var env = {
  production: 'production',
  development: 'development'
};

var paths = {
  app: './todoApp',
  build: './build',

  jsDir: 'js',
  cssDir: 'css',
  dataDir: 'data',

  vendorCSS: 'vendor.css',
  vendorJS: 'vendor.js',

  entryPoint: 'index.html',
  entryPointJS: 'main.js',

  appConcatFileJS: 'app.js',
  appConcatFileCSS: 'app.css'
};


gulp.task('default', ['help']);

gulp.task('help', function () {
  return console.log("\n\n\n\t\t\tHey!\n\n\n");
});

gulp.task('web', function() {
  connect.server({
    name: 'Dist App',
    root: 'build',
    port: 8001,
    livereload: true
  });
});

gulp.task('do', ['clean'], function () {
  runSequence(
    ['copy-data', 'set-dev-node-env'],
    ['copy-fonts', 'styles-app', 'styles-vendor', 'scripts-app', 'scripts-vendor'],
    ['scripts-inject']
  );
});

gulp.task('scripts-vendor', function () {
  checkEnv();

  var filter = process.env.NODE_ENV === env.development ? '**/*.js' : '**/*.min.js';

  return gulp.src(bowerFiles(filter))
    .pipe(order([
      // TODO: use minimatch or smthng
      '**/jquery.min.js',
      '**/jquery.js',
      '**/*'
    ]))
    .pipe(concat(paths.vendorJS))
    .pipe(gulp.dest(path.join(paths.build, paths.jsDir)));
});

gulp.task('styles-vendor', function () {
  checkEnv();

  return gulp.src(bowerFiles('**/*.css'))
    .pipe(concat(paths.vendorCSS))
    .pipe(gulp.dest(path.join(paths.build, paths.cssDir)));
});

gulp.task('scripts-app', function () {
  checkEnv();

  var sources = gulp.src(path.join(paths.app, '**/*.js'));

  var templates = gulp.src('**/*.template.html')
    .pipe(angularTemplateCache({
      module: 'todoApp.ui',
      standalone: false,
      moduleSystem: 'IIFE',
      transformUrl: function (url) {
        return url.replace(/^todoApp\\/, '.\\');
      }
    }));

  return es.merge(sources, templates)
    .pipe(order([
      '**/main.js',
      '**/*.module.js',
      '**/*.service.js',
      '**/*.component.js',
      '**/*.directive.js',
      '**/*.ctrl.js',
      'templates.js'
    ]))
    .pipe(concat(paths.appConcatFileJS))
    .pipe(gulpif(process.env.NODE_ENV === env.production, uglify()))
    .pipe(gulp.dest(path.join(paths.build, paths.jsDir)));
});

gulp.task('styles-app', function () {
  checkEnv();

  var sources = gulp.src(path.join(paths.app, '**/*.css'));

  return sources
    .pipe(concat(paths.appConcatFileCSS))
    .pipe(gulpif(process.env.NODE_ENV === env.production, cleanCSS()))
    .pipe(gulp.dest(path.join(paths.build, paths.cssDir)));
});

gulp.task('clean', function () {
  return gulp.src(paths.build, {read: false})
    .pipe(clean());
});

gulp.task('copy-fonts', function () {
  checkEnv();

  return gulp.src(bowerFiles('**/fonts/*'))
    .pipe(gulp.dest(path.join(paths.build, 'fonts')));
});

gulp.task('copy-data', function () {
  gulp
    .src(path.join(paths.app, paths.dataDir, '**/*.json'))
    .pipe(gulp.dest(path.join(paths.build, paths.dataDir)));
});

gulp.task('set-dev-node-env', function () {
  return process.env.NODE_ENV = env.development;
});

gulp.task('set-prod-node-env', function () {
  return process.env.NODE_ENV = env.production;
});

gulp.task('scripts-inject', function () {
  var options = {
    // FIXME: smells bad, feels terrible. Such bad, much evil
    addPrefix: '.',
    ignorePath: '../build/',
    removeTags: true,
    relative: true
  };

  var source = gulp.src(path.join(paths.app, paths.entryPoint));

  var headFiles = gulp.src([
    path.join(paths.build, paths.jsDir, paths.vendorJS),
    path.join(paths.build, paths.cssDir, paths.vendorCSS),
    path.join(paths.build, paths.cssDir, paths.appConcatFileCSS)
  ], {read: false});

  var bodyFiles = gulp.src([
    path.join(paths.build, paths.jsDir, paths.appConcatFileJS),
    path.join(paths.build, paths.jsDir, 'templates.js')
  ], {read: false});

  return source
    .pipe(inject(headFiles, merge(options, {name: 'head'})))
    .pipe(inject(bodyFiles, merge(options, {name: 'body'})))
    .pipe(gulp.dest(paths.build));
});

function checkEnv() {
  if (argv.env) {
    process.env.NODE_ENV = argv.env;

    // shortcuts
  } else if (argv.D) {
    process.env.NODE_ENV = env.development;

  } else if (argv.P) {
    process.env.NODE_ENV = env.production;
  }

  if (!process.env.NODE_ENV in env || !process.env.NODE_ENV) {
    throw new Error(`Bad environment value (${process.env.NODE_ENV})`);
  }
}