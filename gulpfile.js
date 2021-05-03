var gulp = require('gulp');
var ts = require('gulp-typescript');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
 

gulp.task('lib', function() {
    return gulp.src('src/Scripts/lib/*.ts')
    .pipe(ts())
    .pipe(gulp.dest('src/Scripts/lib'));
});

gulp.task('main', function () {
    return gulp.src('src/Scripts/*.ts')
        .pipe(ts())
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('public/Scripts'));
});

gulp.task('default', gulp.series('lib', 'main'))


