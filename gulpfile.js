var gulp = require('gulp');

var del = require('del');
var path = require('path');

var concat = require('gulp-concat');
var bowerFiles = require('main-bower-files');


var paths = {
  build: './build'
};


gulp.task('scripts-vendor', function() {
  var filter = process.env.NODE_ENV === 'development' ? '**/*.js' : '**/*.min.js';

  return gulp.src(bowerFiles(filter))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./build'));
});

gulp.task('default', ['clean', 'set-prod-node-env', 'scripts-vendor']);

gulp.task('clean', function () {
  del([path.join(paths.build, '/**'), path.join('!', paths.build)]).then(function (paths) {
    console.log('Deleted files and folders:\n', paths.join('\n'));
  });
});

gulp.task('set-dev-node-env', function() {
  return process.env.NODE_ENV = 'development';
});

gulp.task('set-prod-node-env', function() {
  return process.env.NODE_ENV = 'production';
});