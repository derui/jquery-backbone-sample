gulp = (require './gulp')([
  'browserify',
   'watch',
   'loopback',
   'copy',
   'clean',
   'compass',
   'jshint'
   ])

sequence = require 'run-sequence'

gulp.task 'serve', ->
  sequence 'copy', 'compass', ['watch', 'server']
