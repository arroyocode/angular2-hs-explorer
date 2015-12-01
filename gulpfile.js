var gulp = require('gulp');
var clip = require('gulp-clip-empty-files');
var tsd = require('gulp-tsd');
var del = require('del');
var sync = require('browser-sync');
var seq = require('run-sequence');
var changed = require('gulp-changed');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var fs = require('fs');
var mkdirp = require('mkdirp');
var getDirName = require('path').dirname;
var syncRequest = require('sync-request');
var tsc = require('gulp-typescript');

var wwwRoot = 'wwwroot/';
var options = {
    client: {
        dependenciesPath: wwwRoot + 'client-dependencies/',
        ts: {
            files: 'src/typescript/**/*.ts',
            outputPath: wwwRoot + 'js/'
        },
        sass: {
            files: 'src/sass/**/*.scss',
            outputPath: wwwRoot + 'css'
        },
        html: {
            files: 'src/**/*.html',
            outputPath: wwwRoot
        }
    },
    server: {
        browser: {
            host: 'localhost',
            port: 3000,
            notify: true,
            open: true,
			reloadDebounce: 3000
        }
    }
};

function fileCleanup(file, extensions) {
    var fileName = file.substring(0, file.lastIndexOf('.'));
    var cleanUpFiles = [];
    extensions.forEach(function (ext) {
        cleanUpFiles.push(fileName + ext);
    });
    del(cleanUpFiles);
}

var clientDependencies = require('./clientdependencies.json');
gulp.task('client-dependencies', function () {
    var dest = options.client.dependenciesPath;
    del.sync([dest]);

    var moduleSources = [];
    var modulesRootPath = './' + clientDependencies.modulesRootPath + '/';
    clientDependencies.dependencies.forEach(function (dependency) {
        moduleSources.push(modulesRootPath + dependency);
    });

    gulp.src(moduleSources, { base: clientDependencies.modulesRootPath })
        .pipe(gulp.dest(dest));

    var remoteSources = [];
    var remoteDependenciesRootPath = './' + clientDependencies.remoteDependenciesRootPath + '/';
    clientDependencies.remoteDependencies.forEach(function (dependencyUrl) {
        var path = dependencyUrl.slice(dependencyUrl.indexOf('://') + 3);
        var fullPath = remoteDependenciesRootPath + path;
        remoteSources.push(fullPath);

        if (!fs.existsSync(fullPath)) {
            mkdirp.sync(getDirName(fullPath), [], function (error) {
                if (error) {
                    throw error;
                }
            });
            var data = syncRequest('GET', dependencyUrl)
            fs.writeFileSync(fullPath, data.getBody());
        }
    });

    gulp.src(remoteSources, { base: clientDependencies.remoteDependenciesRootPath })
        .pipe(gulp.dest(dest));

});

gulp.task('build-ts', function () {
    var project = tsc.createProject('tsconfig.json', {
        typescript: require('typescript')
    });
    gulp.src(options.client.ts.files)
        .pipe(clip())
        .pipe(sourcemaps.init())
        .pipe(tsc(project))
        .pipe(sourcemaps.write('./', { sourceRoot: '/' }))
        .pipe(gulp.dest(options.client.ts.outputPath));
});

gulp.task('build-sass', function () {
    gulp.src(options.client.sass.files)
        .pipe(clip())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(gulp.dest(options.client.sass.outputPath));
});

gulp.task('build-wwwroot', ['build-ts', 'build-sass'], function() {
    gulp.src(options.client.html.files)
        .pipe(gulp.dest(options.client.html.outputPath));
});

var reload = sync.reload;
gulp.task('browser-sync', function() {
    sync({
        host: options.server.browser.host,
        port: options.server.browser.port,
        notify: options.server.browser.notify,
        open: options.server.browser.open,
		reloadDebounce: options.server.browser.reloadDebounce,
        server: {
            baseDir: wwwRoot,
            injectChanges: true
        }
    });
});

gulp.task('watch-ts', function() {
    var project = tsc.createProject('tsconfig.json', {
        typescript: require('typescript')
    });
    gulp.src(options.client.ts.files)
        .pipe(changed(options.client.ts.files, { extension: '.js' }))
        .pipe(clip())
        .pipe(sourcemaps.init())
        .pipe(tsc(project))
        .pipe(gulp.dest(options.client.ts.outputPath))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('watch-sass', function() {
    gulp.src(options.client.sass.files)
        .pipe(changed(options.client.sass.files, { extension: '.css' }))
        .pipe(clip())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(gulp.dest(options.client.sass.outputPath))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('watch-html', function() {
    gulp.src(options.client.html.files)
        .pipe(gulp.dest(options.client.html.outputPath))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('client-reload', function () {
    sync.reload();
});

gulp.task('build-setup', function () {
    seq('client-dependencies', ['build-wwwroot']);
});

gulp.task('watch', function () {
    gulp.watch(options.client.ts.files, ['watch-ts'])
        .on('change', function (file) {
            if (file.type === 'deleted') {
                var fileMask = options.client.ts.outputPath + file.path.substring(file.path.lastIndexOf('\\') + 1);
                fileCleanup(fileMask, ['.js', '.js.map']);
            }
        });
    gulp.watch(options.client.sass.files, ['watch-sass'])
        .on('change', function (file) {
            if (file.type === 'deleted') {
                var fileMask = options.client.sass.outputPath + file.path.substring(file.path.lastIndexOf('\\') + 1);
                fileCleanup(fileMask, ['.css']);
            }
        });
    gulp.watch(options.client.html.files, ['watch-html'])
        .on('change', function (file) {
            if (file.type === 'deleted') {
                var fileMask = options.client.html.outputPath + file.path.substring(file.path.lastIndexOf('\\') + 1);
                fileCleanup(fileMask, ['.html']);
            }
        });
});

gulp.task('default', function () {
    seq('build-setup', ['watch', 'browser-sync']);
});