gulp = (require './gulp')(['browserify', 'watch', 'loopback', 'copy', 'clean'])

sequence = require 'run-sequence'

gulp.task 'serve', ->
  sequence 'copy', ['watch', 'server']
