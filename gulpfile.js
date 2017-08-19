var gulp         = require('gulp'),
    sass         =  require('gulp-sass'),
    notify       = require('gulp-notify'),
    browserSync  = require('browser-sync'),
    concat       = require('gulp-concat'),
    cssnano      = require('gulp-cssnano'),
    rename       = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
    return gulp.src('app/sass/style.scss')
        .pipe(sass().on('error', notify.onError({title: 'sass'})))
        .pipe(autoprefixer(['last 2 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('css-libs', ['sass'], function () {
    return gulp.src('app/css/*.css')
        .pipe(concat('style.css'))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'))
});

gulp.task('watch', ['browser-sync', 'css-libs'], function () {
    gulp.watch('app/sass/**/*.scss', [sass], browserSync.reload);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('default', ['watch']);