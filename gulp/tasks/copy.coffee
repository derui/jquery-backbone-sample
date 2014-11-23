gulp = require 'gulp'

gulp.task 'copy', ->
  gulp.src 'assets/html/**/*.html'
  .pipe gulp.dest 'public'
