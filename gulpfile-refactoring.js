var gulp = require('gulp');
var seq = require('run-sequence');
var clip = require('gulp-clip-empty-files');
var changed = require('gulp-changed');
var del = require('del');
var tsc = require('gulp-typescript');
var tsProject = tsc.createProject('tsconfig.json', { typescript: require('typescript') });
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var clientDependencies = require('./clientDependencies.json');

function fileCleanup(sourceFilePath, extensions) {
    var prefix = sourceFilePath.substring(0, sourceFilePath.lastIndexOf('.'));
    var cleanUpFiles = [];
    extensions.forEach(function (ext) {
        cleanUpFiles.push(prefix + ext);
    });
    del(cleanUpFiles);
}

var clientDependenciesPath = 'app/client-dependencies/';
var clientAppPath = 'app/';
var tsFiles = 'src/**/*.ts';
var scssFiles = 'src/**/*.ts';

gulp.task('client-dependencies', function () {
    del.sync([clientDependenciesPath]);
    var moduleSources = [];
    var modulesRootPath = './' + clientDependencies.modulesRootPath + '/';
    clientDependencies.dependencies.forEach(function (dependency) {
        moduleSources.push(modulesRootPath + dependency);
    });
    return gulp.src(moduleSources, { base: clientDependencies.modulesRootPath })
        .pipe(gulp.dest(clientDependenciesPath));
});

gulp.task('build-ts', function () {
    return gulp.src(tsFiles)
        .pipe(changed(clientAppPath, { extension: '.js' }))
        .pipe(clip())
        .pipe(tsc(tsProject))
        .pipe(gulp.dest(clientAppPath));
});

gulp.task('build-scss', function () {
    return gulp.src(scssFiles)
        .pipe(changed(clientAppPath, { extension: '.css' }))
        .pipe(clip())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest(clientAppPath));
});

gulp.task('copy-html', function () {
    return gulp.src([
        './src/**/*.html',
        './src/assets/favicon.png'])
        .pipe(changed(clientAppPath))
        .pipe(clip())
        .pipe(gulp.dest(clientAppPath));
});

gulp.task('build-approot', ['client-dependencies', 'build-ts', 'build-scss', 'copy-html'], function () {});

gulp.task('flush-approot', function (cb) {
	del([clientAppPath, clientDependenciesPath], cb);
});

gulp.task('browser-sync', function () {
	browserSync({
		host: 'localhost',
		port: 3000,
		notify: true,
		open: true,
		files: [
			'app/**/*.*'
		]
	});
});

gulp.task('watch', function () {
	gulp.watch(tsFiles, ['build-ts'])
		.on('change', function (file) {
			if (file.type === 'deleted') {
                var fileMask = clientAppPath + file.path.substring(file.path.lastIndexOf('\\') + 1);
                fileCleanup(fileMask, ['.js', '.js.map']);
            }
		});
	gulp.watch(scssFiles, ['build-scss'])
		.on('change', function (file) {
			if (file.type === 'deleted') {
                var fileMask = clientAppPath + file.path.substring(file.path.lastIndexOf('\\') + 1);
                fileCleanup(fileMask, ['.css', '.css.map']);
            }
		});
	gulp.watch([clientAppPath + '**/*.html'], ['copy-html'])
		.on('change', function (event) {
			if (event.type === 'deleted') {
				var extension = '.' + event.path.split('.').pop();
				fileCleanup(clientAppPath, [extension]);
			}
		});
});

gulp.task('default', function (cb) {
	seq(
		'flush-approot',
		['build-approot'],
		['browser-sync', 'watch'],
		cb);
});
