gulp = require 'gulp'
webserver = require 'gulp-webserver'

server = require '../../server'

connectConfig =
port: 3000
hostname: 'localhost'

gulp.task 'server',  ->
  # mockサーバーの起動
  server.set 'port', connectConfig.port
  server.set 'host', connectConfig.hostname

  server.start().on('error', (err) ->
    if err.code is 'EADDRINUSE'
      gutil.error 'Port #{connectConfig.port} is laready in use by another process'
    else gutil.error err
  )

  gulp.src(['public'])
    .pipe(webserver
      livereload: true
      port: 8000
  )
