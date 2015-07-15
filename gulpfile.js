var gulp = require('gulp'), 
    sass = require('gulp-ruby-sass') ,
    notify = require('gulp-notify') ;

var config = {
     sassPath: './app/assets/scss',
     bowerDir: './web/jspm_packages' 
};

gulp.task('default', function () {
});

gulp.task('css', function() { 
    return sass(config.sassPath + '/style.scss', {
             style: 'compressed',
             loadPath: [
                 './app/assets/scss',
                 config.bowerDir + '/github/twbs/bootstrap-sass@3.3.5/assets/stylesheets'
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
