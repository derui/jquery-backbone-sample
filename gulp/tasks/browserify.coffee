gulp = require 'gulp'
browserify = require 'browserify'
watchify = require 'watchify' 
gutil = require 'gulp-util'
source = require 'vinyl-source-stream'
glob = require 'glob'
path = require 'path'
remapify = require 'remapify'

transform = require('node-underscorify').transform
  extensions: ['html']
  requires : [{variable : '_', module : 'underscore'}]

gulp.task 'watch:browserify', ->
  b = browserify
    entries : path.resolve('assets/js/main.js')
    noparse : ['jquery', 'underscore']
    debug : true
    extensions: ['.js', '.html']
    fullPaths: true
    cache: {}
    packageCache : {}

  b.transform transform

  b.plugin 'minifyify',
    map: 'app.map.json'
    output: './public/js/app.js'

  b.plugin remapify, [{
    src: './assets/js/**/*.js'
    expose: 'app/'
  }, {
    src: './**/*.html'
    expose: 'tmpl'
    cwd: 'assets/template'
  }]

  w = watchify b, watchify.args

  rebundle = ->
    w.bundle()
      .on('error', (e) ->
        gutil.log('Browserify Error', e);
      )
      .pipe(source('app.js'))
      .pipe(gulp.dest('./public/js'))

  w.on 'update', ->
    gutil.log('Finish browserify build.');
    return rebundle()

  rebundle()
