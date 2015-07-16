var gulp = require('gulp');
var sass = require('gulp-sass') ;
var paths = require('../paths');

gulp.task('css', function() { 
    return gulp
        .src(paths.sassPath + '/**/*.scss')
        .pipe(
            sass({
                includePaths: [
                    paths.jspmPath + '/github/twbs/bootstrap-sass@3.3.5/assets/stylesheets',
                    './app/assets/scss'
                ]
            }))
            .pipe(gulp.dest('./web/assets/css')); 
});
