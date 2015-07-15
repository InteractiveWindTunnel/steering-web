var gulp = require('gulp'), 
    sass = require('gulp-ruby-sass') 
    notify = require('gulp-notify') 
    bower = require('gulp-bower');

var config = {
     sassPath: './app/assets/scss',
     bowerDir: './bower_components' 
}

gulp.task('bower', function() { 
    return bower()
         .pipe(gulp.dest(config.bowerDir)) 
});

gulp.task('default', function () {
});

gulp.task('css', function() { 
    return sass(config.sassPath + '/style.scss', {
             style: 'compressed',
             loadPath: [
                 './app/Resources/sass',
                 config.bowerDir + '/bootstrap-sass-official/assets/stylesheets'
             ]
         })
        .on("error", notify.onError(function (error) {
                 return "Error: " + error.message;
             }))
        .pipe(gulp.dest('./web/assets/css')); 
});

 gulp.task('watch', function() {
     gulp.watch(config.sassPath + '/**/*.scss', ['css']); 
});
