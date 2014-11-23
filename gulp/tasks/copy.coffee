gulp = require 'gulp'
merge = require 'merge-stream'

gulp.task 'copy', ['copy:bower'],  ->
  gulp.src 'assets/html/**/*.html'
  .pipe gulp.dest 'public'

gulp.task 'copy:bower', ->
  merge(gulp.src('bower_components/foundation/css/**/*')
      .pipe(gulp.dest 'public/vendor/css'),
    gulp.src('bower_components/foundation/js/**/*')
      .pipe(gulp.dest 'public/vendor/js')
    )

