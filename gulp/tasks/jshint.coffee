gulp = require 'gulp'
jshint = require 'gulp-jshint'
stylish = require 'jshint-stylish'

gulp.task 'jshint', ->
  gulp.src('assets/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter stylish)
