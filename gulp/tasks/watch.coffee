gulp = require 'gulp'

gulp.task 'watch', ['watch:browserify'], ->
  gulp.watch 'assets/html/**/*', ['copy']

  gulp.watch 'assets/scss/**/*', ['compass']

  gulp.watch 'assets/js/**/*.js', ['jshint']
