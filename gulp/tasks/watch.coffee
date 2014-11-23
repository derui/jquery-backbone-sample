gulp = require 'gulp'

gulp.task 'watch', ['watch:browserify'], ->
  gulp.watch 'assets/html/**/*', ['copy']
