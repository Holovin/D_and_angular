var gulp = require('gulp-help')(require('gulp'), {hideDepsMessage: true});

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
  appDir: 'todoApp',

  build: './build',

  jsDir: 'js',
  cssDir: 'css',
  dataDir: 'data',

  vendorCSS: 'vendor.css',
  vendorJS: 'vendor.js',

  entryPoint: 'index.html',
  entryPointJS: 'main.js',

  appConcatFileJS: 'app.js',
  appConcatFileCSS: 'app.css',

  templatesJS: 'templates.js',

  uiRouter: {
    production: './node_modules/angular-ui-router/release/angular-ui-router.js',
    development:  './node_modules/angular-ui-router/release/angular-ui-router.min.js'
  }
};

var tasks = {
  checkEnv: {
    name: 'check-env',
    desc: false
  },

  build: {
    name: 'do',
    desc: 'Build project'
  },

  web: {
    name: 'web',
    desc: 'Run local server with app'
  },

  clean: {
    name: 'clean',
    desc: 'Clean build path'
  },

  scriptsVendor: {
    name: 'scripts-vendor',
    desc: 'Concat and minify vendor js files'
  },

  stylesVendor: {
    name: 'styles-vendor',
    desc: 'Concat and minify vendor css files'
  },

  scriptsApp: {
    name: 'scripts-app',
    desc: 'Concat and minify app js files'
  },

  stylesApp: {
    name: 'styles-app',
    desc: 'Concat and minify app css files'
  },

  scriptsInject: {
    name: 'scripts-inject',
    desc: 'Inject js and css files into main app.html file'
  },

  copyFonts: {
    name: 'copy-fonts',
    desc: 'Copy bower fonts to build folder'
  },

  copyData: {
    name: 'copy-data',
    desc: 'Copy data (.json) files to build folder'
  }
};

var helpOpt = {
  options: {
    'env=ENV': 'set environment value before running',
    'D': '...with development environment',
    'P': '...with production environment'
  }
};

gulp.task('default', false, ['help']);

gulp.task(tasks.web.name, tasks.web.desc, function() {
  connect.server({
    name: 'Dist App',
    root: paths.build,
    port: 8001,
    livereload: true
  });
});

gulp.task(tasks.build.name, tasks.build.desc, [tasks.clean.name, tasks.checkEnv.name], function () {
  runSequence([
    tasks.copyData.name, tasks.copyFonts.name,
    tasks.stylesApp.name, tasks.scriptsApp.name,
    tasks.scriptsVendor.name, tasks.stylesVendor.name
  ], [
    tasks.scriptsInject.name
    ]
  );
}, helpOpt);

gulp.task(tasks.scriptsVendor.name, tasks.scriptsVendor.desc, [tasks.checkEnv.name], function () {
  var filter;
  var router;

  if (process.env.NODE_ENV === env.development) {
    filter = '**/*.js';
    router = paths.uiRouter.development;

  } else {
    filter = '**/*.min.js';
    router = paths.uiRouter.production;
  }

  router = gulp.src(router);
  var bower = gulp.src(bowerFiles(filter));

  return es.merge(bower, router)
    .pipe(order([
      // TODO: use minimatch or smthng
      '**/jquery.min.js',
      '**/jquery.js',
      '**/angular.min.js',
      '**/angular.js',
      '**/*'
    ]))
    .pipe(concat(paths.vendorJS))
    .pipe(gulp.dest(path.join(paths.build, paths.jsDir)));
});

gulp.task(tasks.stylesVendor.name, tasks.stylesVendor.desc, [tasks.checkEnv.name], function () {
  return gulp.src(bowerFiles('**/*.css'))
    .pipe(concat(paths.vendorCSS))
    .pipe(gulp.dest(path.join(paths.build, paths.cssDir)));
});

gulp.task(tasks.scriptsApp.name, tasks.scriptsApp.desc, [tasks.checkEnv.name], function () {
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
      paths.templatesJS
    ]))
    .pipe(concat(paths.appConcatFileJS))
    .pipe(gulpif(process.env.NODE_ENV === env.production, uglify()))
    .pipe(gulp.dest(path.join(paths.build, paths.jsDir)));
});

gulp.task(tasks.stylesApp.name, tasks.stylesApp.desc, [tasks.checkEnv.name], function () {
  var sources = gulp.src(path.join(paths.app, '**/*.css'));

  return sources
    .pipe(concat(paths.appConcatFileCSS))
    .pipe(gulpif(process.env.NODE_ENV === env.production, cleanCSS()))
    .pipe(gulp.dest(path.join(paths.build, paths.cssDir)));
});

gulp.task(tasks.clean.name, tasks.clean.desc, function () {
  return gulp.src(paths.build, {read: false})
    .pipe(clean());
});

gulp.task(tasks.copyFonts.name, tasks.copyFonts.desc, [tasks.checkEnv.name], function () {
  return gulp.src(bowerFiles('**/fonts/*'))
    .pipe(gulp.dest(path.join(paths.build, 'fonts')));
});

gulp.task(tasks.copyData.name, tasks.copyData.desc, function () {
  gulp.src(path.join(paths.app, paths.dataDir, '**/*.json'))
    .pipe(gulp.dest(path.join(paths.build, paths.dataDir)));
});

gulp.task(tasks.scriptsInject.name, tasks.scriptsInject.desc, function () {
  var options = {
    // FIXME: smells bad, feels terrible. Such bad, much evil
    addPrefix: '.',
    ignorePath: '.' + paths.build,
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
    path.join(paths.build, paths.jsDir, paths.templatesJS)
  ], {read: false});

  return source
    .pipe(inject(headFiles, merge(options, {name: 'head'})))
    .pipe(inject(bodyFiles, merge(options, {name: 'body'})))
    .pipe(gulp.dest(paths.build));
});

gulp.task(tasks.checkEnv.name, tasks.checkEnv.desc, function (done) {
  if (argv.env) {
    process.env.NODE_ENV = argv.env;

    // shortcuts
  } else if (argv.D) {
    process.env.NODE_ENV = env.development;

  } else if (argv.P) {
    process.env.NODE_ENV = env.production;
  }

  if (!process.env.NODE_ENV in env || !process.env.NODE_ENV) {
    var e = new Error(`Bad environment value (${process.env.NODE_ENV}). Use -env=ENV, -D or -P flags for run this task.`);
    e.showStack = false;
    done(e);
  }

  done();
});