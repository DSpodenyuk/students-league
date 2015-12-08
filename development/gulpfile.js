var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    coffee = require('gulp-coffee'),
    bourbon = require('node-bourbon'),
    spritesmith = require('gulp.spritesmith');


var compilDir = '../production';


gulp.task('connect', function () {
    connect.server({
        root: compilDir,
        livereload: true
    });
});

gulp.task('sprite', function () {
    var spriteData = gulp.src('./sprites/*.png') // путь, откуда берем картинки для спрайта
        .pipe(spritesmith({
            imgName: 'main-sprite.png',
            cssName: '_icons.sass',
            padding: 1,
            cssFormat: 'sass',
            imgPath: '../img/main-sprite.png',
            cssVarMap: function (sprite) {
                sprite.name = 's-' + sprite.name;
            }
        }));

    spriteData.img.pipe(gulp.dest(compilDir + '/img')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('./sass/moduls'));
    spriteData.pipe(livereload());// путь, куда сохраняем стили
});

gulp.task('jade', function () {
    gulp.src('./templates/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(compilDir))
        .pipe(livereload());
});

/*
gulp.task('coffee', function () {
    gulp.src('./coffee/*.coffee')
        .pipe(coffee())
        .pipe(gulp.dest(compilDir + '/js'))
        .pipe(livereload());
});
*/

gulp.task('sass', function () {
    gulp.src('./sass/*.sass')
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: require('node-bourbon').includePaths
        }))
        .pipe(gulp.dest(compilDir + '/css'))
        .pipe(livereload());
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('./templates/**/*.jade', ['jade']);
    //gulp.watch('./coffee/*.coffee', ['coffee']);
    gulp.watch('./sass/**/*.sass', ['sass']);
    gulp.watch('./sprites/**/*.png', ['sprite']);
});

gulp.task('default', ['connect', 'jade', 'sprite', 'sass', 'watch']);