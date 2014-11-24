gulp = require 'gulp'
browserify = require 'browserify'
watchify = require 'watchify' 
gutil = require 'gulp-util'
source = require 'vinyl-source-stream'
glob = require 'glob'
path = require 'path'
remapify = require 'remapify'
mold = require 'mold-source-map'
exorcist = require 'exorcist'
vtrans = require 'vinyl-transform'
concat = require 'gulp-concat'
buffer = require 'vinyl-buffer'
sourcemaps = require 'gulp-sourcemaps'
uglify = require 'gulp-uglify'

transform = require('node-underscorify').transform
  extensions: ['html']
  requires : [{variable : '_', module : 'underscore'}]

gulp.task 'watch:browserify', ->
  b = browserify
    entries : './assets/js/main.js'
    noParse : ['jquery', 'underscore']
    debug : true
    extensions: ['.js', '.html']
    fullPaths: true
    cache: {}
    packageCache : {}

  b.transform transform

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
      .pipe(source 'app.js')
      .pipe(buffer())
      .pipe(sourcemaps.init(loadMaps: true))
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./public/js'))

  w.on 'update', ->
    gutil.log('Finish browserify build.');
    return rebundle()

  rebundle()
