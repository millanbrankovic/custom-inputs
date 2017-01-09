var gulp = require('gulp'),
    rev = require('gulp-rev'),
    watch = require('gulp-watch'),
    usemin = require('gulp-usemin'),
    imagemin = require('gulp-imagemin'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss'),
    cssnext = require('postcss-cssnext'),
    nested = require('postcss-nested'),
    cssimport = require('postcss-import'),
    pxtorem = require('postcss-pxtorem'),
    inlinesvg = require('postcss-inline-svg'),
    datapacker = require('postcss-data-packer'),
    path = require('path'),
    del = require('del'),
    {david} = require('@cedx/gulp-david'),
    browserSync = require('browser-sync').create();

// watch
gulp.task('watch', function() {
    browserSync.init({
        notify: false,
        server: {
            baseDir: 'app'
        }
    });

    watch('app/**/*.html', function() {
        browserSync.reload();
    });

    watch('app/assets/css/**/*.css', function() {
        gulp.start('cssInject');
    });
});

// compile css with postcss plugins
gulp.task('css', function() {
    var processors = [
        cssimport(),
        nested(),
        cssnext({ browsers: 'last 2 version, > 1%, ie >= 11, iOS >= 7' }),
        pxtorem(),
        inlinesvg({ path: 'app/assets/img/' }),
        datapacker({
            dest: {
                path: function(opts) {
                    return ('app/build/css/' + path.basename(opts.from, '.css') + '-data.css');
                },
                map: { inline: true }
            }
        })
    ];

    return gulp.src('app/assets/css/styles.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        .on('error', function(errorInfo) {
            console.log(errorInfo.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('app/build/css'));
});

// reload browser after saving css without refreshing a dom
gulp.task('cssInject', ['css'], function() {
    return gulp.src('app/build/css/styles.css')
        .pipe(browserSync.stream());
});

// delete dist folder
gulp.task('deleteDist', function() {
    return del('dist');
});

// preview distributable version
gulp.task('previewDist', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });
});

// optimize images
gulp.task('optimizeImages', ['deleteDist'], function() {
    return gulp.src(['app/assets/img/**/*.+(jpg|svg|ico)'])
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            multipass: true,
            optimizationLevel: 3
        }))
        .pipe(gulp.dest('dist/assets/img'));
});

// copy fonts to dist folder
gulp.task('fonts', ['deleteDist'], function() {
    return gulp.src('app/assets/fonts/**/*')
        .pipe(gulp.dest('dist/assets/fonts'));
});

// generate revisioned and minified files
gulp.task('usemin', ['deleteDist', 'css'], function() {
    return gulp.src('app/**/*.html')
        .pipe(usemin({
            css: [function() {return rev()}, function() {return cssnano()}]
        }))
        .pipe(gulp.dest('dist'));
});

// build production environment
gulp.task('build', ['deleteDist', 'optimizeImages', 'fonts', 'usemin']);

// update package.json with new versions of dependencies
gulp.task('checkDependencies', function() {
    return gulp.src('package.json')
        .pipe(david({ update: true }))
        .on('error', function(err) {
            console.error(err);
            this.emit('end');
        })
        .pipe(gulp.dest('.'))
});
