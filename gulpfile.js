var gulp = require( 'gulp' );
var sass = require( 'gulp-sass' );
var browserSync = require( 'browser-sync' );
var reload = browserSync.reload;

gulp.task( 'sass', function() {
    return gulp.src( 'app/sass/**/*.scss' )
        .pipe( sass().on( 'error', sass.logError ) )
        .pipe( gulp.dest( 'dist/css' ) )
        .pipe( reload( {
            stream: true
        } ) );
} );

gulp.task( 'html', function() {
    return gulp.src( 'app/*.html' )
        .pipe( gulp.dest( 'dist/' ) )
        .pipe( reload( {
            stream: true
        } ) );
} );

gulp.task( 'scripts', function() {
    return gulp.src( 'app/scripts/**/*.js' )
        .pipe( gulp.dest( 'dist/scripts' ) )
        .pipe( reload( {
            stream: true
        } ) );
} );

// watch Sass files for changes, run the Sass preprocessor with the 'sass' task and reload
gulp.task( 'serve', [ 'html', 'sass', 'scripts' ], function() {
    browserSync( {
        notify: false,
        server: {
            baseDir: 'dist'
        }
    } );

    gulp.watch( 'app/*.html', [ 'html' ] );
    gulp.watch( 'app/sass/**/*.scss', [ 'sass' ] );
    gulp.watch( 'app/scripts/**/*.js', [ 'scripts' ] );
} );