gulp = require 'gulp'
browserify = require 'browserify'
watchify = require 'watchify' 
gutil = require 'gulp-util'
source = require 'vinyl-source-stream'
glob = require 'glob'
path = require 'path'
fs = require 'fs'
remapify = require 'remapify'

transform = require('node-underscorify').transform
  extensions: ['html']

gulp.task 'watch:browserify', ->
  b = browserify path.resolve 'assets/js/main.js'

  b.plugin remapify, [
    src: './**/*.js'
    expose: 'app/'
    cwd : __dirname + '/../assets/js'
  ,
    src: './**/*.html'
    expose: 'tmpl'
    cwd : __dirname + '/../assets/template'
  ]
  b.transform transform

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
