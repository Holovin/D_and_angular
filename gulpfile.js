var gulp = require('gulp');

var del = require('del');
var path = require('path');

var concat = require('gulp-concat');
var order = require("gulp-order");
var bowerFiles = require('main-bower-files');
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

  js: 'js',
  css: 'css',

  entryPoint: 'index.html',
  appConcatFileJS: 'app.js',
  appConcatFileCSS: 'app.css'
};


gulp.task('default', ['clean']);

gulp.task('scripts-vendor', ['set-dev-node-env'], function() {
  checkEnv();

  var filter = process.env.NODE_ENV === env.development ? '**/*.js' : '**/*.min.js';

  return gulp.src(bowerFiles(filter))
    .pipe(order([
      // TODO: use minimatch or smthng
      '**/jquery.min.js',
      '**/jquery.js',
      '**/*'
    ]))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(path.join(paths.build, paths.js)));
});

gulp.task('styles-vendor', function() {
  checkEnv();

  return gulp.src(bowerFiles('**/*.css'))
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(path.join(paths.build, paths.css)));
});

gulp.task('scripts-app', function () {
  checkEnv();

  var sources = gulp.src(path.join(paths.app, '**/*.js'));

  return sources
    .pipe(concat(paths.appConcatFileJS))
    .pipe(uglify())
    .pipe(gulp.dest(paths.build));
});

gulp.task('styles-app', function () {
  checkEnv();

  var sources = gulp.src(path.join(paths.app, '**/*.css'));

  return sources
    .pipe(gulpif(process.env.NODE_ENV === env.production), cleanCSS())
    .pipe(concat(paths.appConcatFileCSS))
    .pipe(gulp.dest(paths.build));
});

gulp.task('clean', function () {
  del([path.join(paths.build, '/**'), path.join('!', paths.build)]).then(function (paths) {
    console.log('Deleted files and folders:\n', paths.join('\n'));
  });
});

gulp.task('set-dev-node-env', function() {
  return process.env.NODE_ENV = env.development;
});

gulp.task('set-prod-node-env', function() {
  return process.env.NODE_ENV = env.production;
});


function checkEnv() {
  if (process.env.NODE_ENV in env || !process.env.NODE_ENV) {
    throw new Error(`Bad environment value (${process.env.NODE_ENV})`);
  }
}