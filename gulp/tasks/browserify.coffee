gulp = require 'gulp'
browserify = require 'browserify'
watchify = require 'watchify' 
gutil = require 'gulp-util'
source = require 'vinyl-source-stream'
glob = require 'glob'
path = require 'path'
fs = require 'fs'
remapify = require 'remapify'

gulp.task 'watch:browserify', ->
  b = browserify path.resolve 'assets/js/main.js'

  b.plugin remapify, [
    src: './**/*.js'
    expose: 'app/'
    cwd : __dirname + '/../assets/js'
  ]

  w = watchify b, watchify.args

  rebundle = ->
    gutil.log('Finish browserify build.');
    w.bundle()
      .on('error', (e) ->
        gutil.log('Browserify Error', e);
      )
      .pipe(source('app.js'))
      .pipe(gulp.dest('./public/js'))

  w.on 'update', rebundle

  rebundle()
