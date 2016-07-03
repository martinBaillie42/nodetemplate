var gulp = require('gulp');

// Gulp Plugins
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var mainBowerFiles = require('main-bower-files');
var gulpConcat = require('gulp-concat');
var gulpUglify = require('gulp-uglify');
var gulpOrder = require('gulp-order');

// Gulp tasks
gulp.task('sass', function () {
    return gulp.src('app/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe(gulp.dest('dist/'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('scripts', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe(gulp.dest('dist/scripts'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('vendorscripts', function () {
    console.log(mainBowerFiles('**/*.js'));
    return gulp.src(mainBowerFiles('**/*.js'))
        .pipe(gulpOrder([
            'jquery.js',
            '*'
        ]))
		.pipe(gulpConcat('vendor.js'))
        .pipe(gulpUglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(reload({
            stream: true
        }));
});

// Main gulp task.
// Watch Sass files for changes, run the Sass preprocessor with the 'sass' task and reload
gulp.task('default', ['html', 'sass', 'scripts', 'vendorscripts'], function () {
    browserSync({
        notify: false,
        server: {
            baseDir: 'dist'
        }
    });

    gulp.watch('app/*.html', ['html']);
    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch(mainBowerFiles(), ['vendorscripts']);
});