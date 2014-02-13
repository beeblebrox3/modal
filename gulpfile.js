var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch');
    sass = require('gulp-sass');

gulp.task('default', function () {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));

    gup.src('src/css/*.scss')
        .pipe(sass())
        .pipe(uglify())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('dev', function () {
    gulp.src('src/js/*.js')
        .pipe(watch(function (files) {
            return files.pipe(gulp.dest('dist/js'));
        }));

    gulp.src('src/css/*.scss')
        .pipe(watch(function (files) {
            return files.pipe(sass()).pipe(gulp.dest('dist/css'))
        }));
});