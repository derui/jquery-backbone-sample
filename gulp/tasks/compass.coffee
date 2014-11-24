gulp = require 'gulp'
compass = require 'gulp-compass'
plumber = require 'gulp-plumber'
gutil = require 'gulp-util'

minifyCSS = require 'gulp-minify-css'

gulp.task 'compass', ->
  gulp.src('assets/scss/**/*.scss')
    .pipe(plumber(
      errorHandler: (error) ->
        gutil.log error
        @emit 'end'
    ))
    .pipe(compass
      css: 'build/css'
      sass: 'assets/scss'
    )
    .pipe(gulp.dest('./build'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./public/css'))
