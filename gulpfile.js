var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var del = require('del');

var onError = function(error){
    return error.messageOriginal ?
    'File: ' + error.file +
    '\rAt: ' + error.line + error.column +
    '\r' + error.messageOriginal :
    error;
};
 
gulp.task('sass', function () {
    return gulp.src('app/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber({
            errorHandler: notify.onError({
            title:'SCSS error',
            message:onError
        })
    }))
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(plumber.stop())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(notify('scss complete'))
});

gulp.task('browser-sync',function() {
    browserSync({
        server: {
            baseDir: "app"
        }
    });
});



gulp.task('build', ['sass'], function() {

    var buildCss = gulp.src([ // Переносим библиотеки в продакшен
        'app/css/*.css'
        ])
    .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
    .pipe(gulp.dest('dist'));

});


gulp.task('watch',['browser-sync', 'sass'],function(){
    gulp.watch('app/scss/**/*.scss',['sass']);
    gulp.watch('app/*.html',browserSync.reload);
    gulp.watch('app/*.js',browserSync.reload);
});


gulp.task('default',['watch']);