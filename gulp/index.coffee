gulp = require 'gulp'
module.exports = (tasks) ->
  require "./tasks/#{task}" for task in tasks

  return gulp
