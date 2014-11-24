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
  sequence 'copy', ['watch', 'server']
