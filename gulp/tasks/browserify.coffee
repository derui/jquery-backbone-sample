gulp = require 'gulp'
browserify = require 'browserify'
gutil = require 'gulp-util'
source = require 'vinyl-source-stream'
glob = require 'glob'
path = require 'path'
fs = require 'fs'
remapify = require 'remapify'

gulp.task 'watch:browserify', ->
  suffix = (options && options.suffix) || ''
  b = browserify 'assets/main.js'

  b.plugin remapify, [
    src: './**/*.js'
    expose: 'app/'
    cwd : __dirname + '/../src'
  ]

  w = watchify b, watchify.args

  rebundle = ->
    w.bundle()
      .on('error', (e) ->
        gutil.log('Browserify Error', e);
      )
      .pipe(source('app.js'))
      .pipe(gulp.dest('./dest'))

  w.on 'update', rebundle

  rebundle()
