gulp = require 'gulp'
webserver = require 'gulp-webserver'

gulp.task 'server', ->
  gulp.src('public')
  .pipe(webserver
    livereload: true
  )
