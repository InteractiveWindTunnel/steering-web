var gulp = require('gulp');
var sass = require('gulp-ruby-sass') ;
var paths = require('../paths');

gulp.task('css', function() { 
    return sass(paths.sassPath + '/style.scss', {
             style: 'compressed',
             loadPath: [
                 './app/assets/scss',
                 paths.jspmPath + '/github/twbs/bootstrap-sass@3.3.5/assets/stylesheets'
             ]
         })
        .pipe(gulp.dest('./web/assets/css')); 
});