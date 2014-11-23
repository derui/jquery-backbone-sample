gulp = require 'gulp'
del = require 'del'
  
gulp.task 'clean', (done) ->
  del ['public/**/*', '!public/.keepme'], done
