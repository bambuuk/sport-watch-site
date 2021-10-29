const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "src" //запускать сересер с папки src
        }
    });
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)") // можно будет читать файлы sass и scss
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) // скомпилировали
            .pipe(rename({
                prefix: "",
                suffix: ".min"
              }))
            .pipe(autoprefixer())
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest("src/css")) // положили по адресу
            .pipe(browserSync.stream()); // обновление страницы после компиляции
});

// отслеживание файлов
gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel("styles"));
    gulp.watch("src/*.html").on("change", browserSync.reload);
});

//запуск всех задач одной командой
gulp.task('default', gulp.parallel('watch', 'server', 'styles'));