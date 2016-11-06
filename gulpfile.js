var gulp = require('gulp');
var runSequence = require('run-sequence');

var merge = require('deepmerge');
var del = require('del');
var path = require('path');

var clean = require('gulp-clean');
var concat = require('gulp-concat');
var order = require("gulp-order");
var bowerFiles = require('main-bower-files');
var inject = require('gulp-inject');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var gulpif = require('gulp-if');

var env = {
  production: 'production',
  development: 'development'
};

var paths = {
  app: './todoApp',
  build: './build',

  jsDir: 'js',
  cssDir: 'css',

  vendorCSS: 'vendor.css',
  vendorJS: 'vendor.js',

  entryPoint: 'index.html',
  appConcatFileJS: 'app.js',
  appConcatFileCSS: 'app.css'
};


gulp.task('default', ['clean']);

gulp.task('do', ['clean', 'set-dev-node-env'], function () {
  runSequence(
    ['styles-app', 'styles-vendor', 'scripts-app', 'scripts-vendor'],
    ['scripts-inject']);
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

  return sources
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

gulp.task('copy', function () { gulp
  .src()
  .pipe(gulp.dest('dist'));
});

gulp.task('set-dev-node-env', function () {
  return process.env.NODE_ENV = env.development;
});

gulp.task('set-prod-node-env', function () {
  return process.env.NODE_ENV = env.production;
});

gulp.task('scripts-inject', function () {
  var options = {
    ignorePath: '/build/',
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
    path.join(paths.build, paths.jsDir, paths.appConcatFileJS)
  ], {read: false});

  return source
    .pipe(inject(headFiles, merge(options, {name: 'head'})))
    .pipe(inject(bodyFiles, merge(options, {name: 'body'})))
    .pipe(gulp.dest(paths.build));
});

function checkEnv() {
  if (!process.env.NODE_ENV in env || !process.env.NODE_ENV) {
    throw new Error(`Bad environment value (${process.env.NODE_ENV})`);
  }
}