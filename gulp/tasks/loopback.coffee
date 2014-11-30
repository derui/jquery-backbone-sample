gulp = require 'gulp'
webserver = require 'gulp-webserver'

server = require '../../server'

connectConfig =
port: 3000
hostname: '0.0.0.0'

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
      livereload:
        port: 8002
        enable: true
      host: '0.0.0.0'
      port: 8000
  )
